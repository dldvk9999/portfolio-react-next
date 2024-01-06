import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "@styles/Home.module.scss";
import { get } from "@api/api";
import type { infoCategory } from "@type/project/type";

const Modal = dynamic(() => import("@components/Modal"), {
    ssr: false,
});

const Project = () => {
    const [showModal, setShowModal] = useState<Array<boolean>>([]);
    const [pro, setPro] = useState<Array<infoCategory>>([
        {
            id: 0,
            title: "",
            start: "",
            end: "",
            introduce: "",
            stack: "",
            takeaway: "",
            image: [],
        },
    ]);

    // DB에서 Project list 가져오기
    async function getProject() {
        await get("project").then((res: any) => {
            // let infos = res.data.data;
            const infos = res;
            const result = [];
            for (const info of infos) {
                result.push({
                    id: info.id,
                    title: info.name,
                    start:
                        new Date(info.start).getFullYear() +
                        "." +
                        (new Date(info.start).getMonth() + 1) +
                        "." +
                        new Date(info.start).getDate(),
                    end:
                        new Date(info.end).getFullYear() +
                        "." +
                        (new Date(info.end).getMonth() + 1) +
                        "." +
                        new Date(info.end).getDate(),
                    introduce: info.introduce,
                    stack: info.stack,
                    takeaway: info.takeaway,
                    image: info.image.split(","),
                });
            }
            setPro(result);
        });
    }

    // Project 출력
    function Project() {
        const result = [];
        for (const project of pro) {
            result.push(
                <div className={styles.activityItem} key={"activity-item-" + project.id}>
                    <Image
                        src={project.image[0] ? "/project/" + project.image[0] + ".webp" : "/loading.gif"}
                        alt={project.title}
                        width={1000}
                        height={500}
                        priority
                        className={styles.activityImage}
                        onClick={() => {
                            let tmp = [...showModal];
                            tmp[project.id - 1] = true;
                            setShowModal(tmp);
                        }}
                    />
                    {/* modal을 함께 렌더링하여 보여지지만 않게끔 함: 부드러운 fadeInOut 효과 및 fixed 효과를 위함 */}
                    <Modal
                        onClose={() => {
                            let tmp = [...showModal];
                            tmp[project.id - 1] = false;
                            setShowModal(tmp);
                        }}
                        show={showModal[project.id - 1]}
                        title={project.title}
                        index={project.id - 1}
                        image={project.image}
                        category="project"
                    >
                        {project.introduce}
                    </Modal>
                    <div className={styles.activityInfo}>
                        <h2>{project.title}</h2>
                        <div>
                            기간 : {project.start} - {project.end}{" "}
                            {new Date().toLocaleDateString() < new Date(project.end).toLocaleDateString() && "예정"}
                        </div>
                        <div>소개 : {project.introduce}</div>
                        <div>기술스택 : {project.stack}</div>
                        <div>배운점 : {project.takeaway}</div>
                    </div>
                </div>
            );
        }
        return result;
    }

    useEffect(() => {
        // 각 페이지에 최초로 출력되는 타이틀 자동으로 숨겨지게 처리
        setTimeout(() => {
            let pageTitle = document.querySelector("#pageTitle") as HTMLElement;
            pageTitle.style.opacity = "0";
        }, 1000);
        setTimeout(() => {
            let pageTitle = document.querySelector("#pageTitle") as HTMLElement;
            pageTitle.style.display = "none";
        }, 2000);

        // DB에서 Project list 가져오기
        getProject();
    }, []);

    useEffect(() => {
        const tmp = Array.from({ length: pro.length }, () => false);
        if (showModal === tmp) return;
        setShowModal(tmp);
    }, [setShowModal]);

    return (
        <main className={styles.main}>
            <div id="pageTitle">Project</div>
            <section className={styles.activity}>
                <h1 className={styles.activityTitle}>Activities</h1>
                {Project()}
            </section>
        </main>
    );
};

export default Project;
