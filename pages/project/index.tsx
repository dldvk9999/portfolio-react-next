import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import dynamic from "next/dynamic";
import get from "../api/api";
const Modal = dynamic(() => import("../../components/Modal"), {
    ssr: false,
});

const Project = () => {
    const [showModal, setShowModal] = useState(new Array());
    const [pro, setPro] = useState([
        {
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
            let info = res.data.data;
            let result = [];
            for (let i = 0; i < info.length / 2; i++) {
                result.push({
                    title: info[i].name,
                    start:
                        new Date(info[i].start).getFullYear() +
                        "." +
                        (new Date(info[i].start).getMonth() + 1) +
                        "." +
                        new Date(info[i].start).getDate(),
                    end:
                        new Date(info[i].end).getFullYear() +
                        "." +
                        (new Date(info[i].end).getMonth() + 1) +
                        "." +
                        new Date(info[i].end).getDate(),
                    introduce: info[i].introduce,
                    stack: info[i].stack,
                    takeaway: info[i].takeaway,
                    image: info[i].image.split(","),
                });
            }
            setPro(result);
        });
    }

    // Project 출력
    function Project() {
        let result = [];

        for (let i = 0; i < pro.length; i++) {
            result.push(
                <div className={styles.activityItem} key={"activity-item-" + i}>
                    <Image
                        src={
                            pro[i].image[0]
                                ? "/project/" + pro[i].image[0] + ".webp"
                                : "/loading.gif"
                        }
                        alt={pro[i].title}
                        width={1000}
                        height={500}
                        priority
                        className={styles.activityImage}
                        onClick={() => {
                            let tmp = [...showModal];
                            tmp[i] = true;
                            setShowModal(tmp);
                        }}
                    />
                    {/* modal을 함께 렌더링하여 보여지지만 않게끔 함: 부드러운 fadeInOut 효과 및 fixed 효과를 위함 */}
                    <Modal
                        onClose={() => {
                            let tmp = [...showModal];
                            tmp[i] = false;
                            setShowModal(tmp);
                        }}
                        show={showModal[i]}
                        title={pro[i].title}
                        index={i}
                        image={pro[i].image}
                        category="project"
                    >
                        {pro[i].introduce}
                    </Modal>
                    <div className={styles.activityInfo}>
                        <h2>{pro[i].title}</h2>
                        <div>
                            기간 : {pro[i].start} - {pro[i].end}{" "}
                            {new Date().toLocaleDateString() <
                                new Date(pro[i].end).toLocaleDateString() &&
                                "예정"}
                        </div>
                        <div>소개 : {pro[i].introduce}</div>
                        <div>기술스택 : {pro[i].stack}</div>
                        <div>배운점 : {pro[i].takeaway}</div>
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
        let tmp = [];
        for (let i = 0; i < pro.length; i++) tmp.push(false);
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
