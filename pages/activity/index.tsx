import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "../../components/Modal";
import styles from "../../styles/Home.module.scss";

const data = [
    {
        title: "제로베이스",
        start: "2022. 8. 1.",
        end: "2023. 1. 31.",
        introduce:
            "Frontend 개발의 기초부터 프로젝트 경험까지 한번에 배울 수 있는 교육",
        position: "수강생",
        takeway:
            "HTML, CSS, Javascript의 기초를 다시 잡을 수 있고, Sass 및 SCSS나 Typescript에 대해서도 배울 수 있으며 React나 Vue를 통해 프로젝트를 진행하고 관련 피드백을 받을 수 있었습니다. 또한 주기적인 코딩테스트를 통해 알고리즘 소양을 기를 수 있었으며 특강을 통해 현업에서는 어떤 개발자를 원하는지, 어떤 개발자가 되어야하는지를 배울 수 있었습니다.",
        image: "zerobase",
    },
    {
        title: "프로젝트제이지 창업",
        start: "2021. 2. 1.",
        end: "2021. 12. 31.",
        introduce:
            "법인회사와 단기간 계약을 맺어 1차 프로젝트로 할 데모 웹사이트 구축",
        position: "PM(Project Manager)",
        takeway:
            "취업이나 입시를 위해 구글링을 하지 않고도 다양한 활동 및 동아리, 대회, 봉사 등들을 한번에 볼 수 있게 하여 취업준비생이나 입시준비생, 주부 등에게 도움을 주며 해당 활동을 완료한 사람에게도 자문을 구할 수 있는 웹사이트를 개발하였습니다. 처음으로 디자이너 및 백엔드, 프론트엔드 개발자 모두 모여 웹사이트를 구축했던 시간이라 보람찬 시간이였습니다. (계약상 결과물 제공 불가)",
        image: "wbs",
    },
];

const Activity = () => {
    const [showModal, setShowModal] = useState(new Array(data.length));

    function activity() {
        let result = [];

        for (let i = 0; i < data.length; i++) {
            result.push(
                <div className={styles.activityItem} key={"activity-item-" + i}>
                    <Image
                        src={"/activity/" + data[i].image + ".webp"}
                        alt={data[i].image}
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
                    <Modal
                        onClose={() => {
                            let tmp = [...showModal];
                            tmp[i] = false;
                            setShowModal(tmp);
                        }}
                        show={showModal[i]}
                        title={data[i].title}
                        index={i}
                        image={"/activity/" + data[i].image + ".webp"}
                    >
                        {data[i].introduce}
                    </Modal>
                    <div className={styles.activityInfo}>
                        <h2>{data[i].title}</h2>
                        <div>
                            기간 : {data[i].start} - {data[i].end}{" "}
                            {new Date().toLocaleDateString() <
                                new Date(data[i].end).toLocaleDateString() &&
                                "예정"}
                        </div>
                        <div>소개 : {data[i].introduce}</div>
                        <div>포지션 : {data[i].position}</div>
                        <div>배운점 : {data[i].takeway}</div>
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
    }, []);

    useEffect(() => {
        let tmp = [];
        for (let i = 0; i < data.length; i++) tmp.push(false);
        if (showModal === tmp) return;
        setShowModal(tmp);
    }, [data, setShowModal]);

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
