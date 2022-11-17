import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import dynamic from "next/dynamic";
import { get } from "../api/api";
const Modal = dynamic(() => import("../../components/Modal"), {
    ssr: false,
});

const Activity = () => {
    const [showModal, setShowModal] = useState(new Array());
    const [act, setAct] = useState([
        {
            title: "",
            start: "",
            end: "",
            introduce: "",
            position: "",
            takeaway: "",
            image: "",
        },
    ]);

    // DB에서 Activity list 가져오기
    async function getActivity() {
        await get("activity").then((res: any) => {
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
                    position: info[i].position,
                    takeaway: info[i].takeaway,
                    image: info[i].image,
                });
            }
            setAct(result);
        });
    }

    // activity 출력
    function activity() {
        let result = [];

        for (let i = 0; i < act.length; i++) {
            result.push(
                <div className={styles.activityItem} key={"activity-item-" + i}>
                    <Image
                        src={
                            act[i].image
                                ? "/activity/" + act[i].image + ".webp"
                                : "/loading.gif"
                        }
                        alt={act[i].image}
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
                        title={act[i].title}
                        index={i}
                        image={act[i].image}
                        category="activity"
                    >
                        {act[i].introduce}
                    </Modal>
                    <div className={styles.activityInfo}>
                        <h2>{act[i].title}</h2>
                        <div>
                            기간 : {act[i].start} - {act[i].end}{" "}
                            {new Date().toLocaleDateString() <
                                new Date(act[i].end).toLocaleDateString() &&
                                "예정"}
                        </div>
                        <div>소개 : {act[i].introduce}</div>
                        <div>포지션 : {act[i].position}</div>
                        <div>배운점 : {act[i].takeaway}</div>
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

        // DB에서 Activity list 가져오기
        getActivity();
    }, []);

    useEffect(() => {
        let tmp = [];
        for (let i = 0; i < act.length; i++) tmp.push(false);
        if (showModal === tmp) return;
        setShowModal(tmp);
    }, [setShowModal]);

    return (
        <main className={styles.main}>
            <div id="pageTitle">Activity</div>
            <section className={styles.activity}>
                <h1 className={styles.activityTitle}>Activities</h1>
                {activity()}
            </section>
        </main>
    );
};

export default Activity;
