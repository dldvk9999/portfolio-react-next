/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "@styles/Home.module.scss";
import { get } from "@api/api";
import scrollUp, { hideTitle } from "pages/common";
import type { infoCategory } from "@type/activity/type";

const Modal = dynamic(() => import("@components/Modal"), {
    ssr: false,
});

const Activity = () => {
    const [showModal, setShowModal] = useState<Array<boolean>>([]);
    const [act, setAct] = useState<Array<infoCategory>>([
        {
            id: 0,
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
            // let infos = res.data.data;
            const infos = res;
            let result = [];
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
                    position: info.position,
                    takeaway: info.takeaway,
                    image: info.image,
                });
            }
            setAct(result);
        });
    }

    // activity 출력
    function activity() {
        let result = [];

        for (const ac of act) {
            result.push(
                <div className={styles.activityItem} key={"activity-item-" + ac.id}>
                    <Image
                        src={ac.image ? "/activity/" + ac.image + ".webp" : "/loading.gif"}
                        alt={ac.image}
                        width={1000}
                        height={500}
                        priority
                        className={styles.activityImage}
                        onClick={() => {
                            let tmp = [...showModal];
                            tmp[ac.id - 1] = true;
                            setShowModal(tmp);
                        }}
                    />
                    {/* modal을 함께 렌더링하여 보여지지만 않게끔 함: 부드러운 fadeInOut 효과 및 fixed 효과를 위함 */}
                    <Modal
                        onClose={() => {
                            let tmp = [...showModal];
                            tmp[ac.id - 1] = false;
                            setShowModal(tmp);
                        }}
                        show={showModal[ac.id - 1]}
                        title={ac.title}
                        index={ac.id - 1}
                        image={ac.image}
                        category="activity"
                    >
                        {ac.introduce}
                    </Modal>
                    <div className={styles.activityInfo}>
                        <h2>{ac.title}</h2>
                        <div>
                            기간 : {ac.start} - {ac.end}{" "}
                            {new Date().toLocaleDateString() < new Date(ac.end).toLocaleDateString() && "예정"}
                        </div>
                        <div>소개 : {ac.introduce}</div>
                        <div>포지션 : {ac.position}</div>
                        <div>배운점 : {ac.takeaway}</div>
                    </div>
                </div>
            );
        }
        return result;
    }

    useEffect(() => {
        // 스크롤 상단 위치
        scrollUp();
        // 타이틀 숨김
        hideTitle();
        // DB에서 Activity list 가져오기
        getActivity();
    }, []);

    useEffect(() => {
        const tmp = Array.from({ length: act.length }, () => false);
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
