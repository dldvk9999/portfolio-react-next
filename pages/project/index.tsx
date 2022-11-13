import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "../../components/Modal";
import styles from "../../styles/Home.module.scss";

const data = [
    {
        title: "졸업 프로젝트",
        start: "2020. 12. 24.",
        end: "2021. 2. 28.",
        introduce:
            "딥러닝을 이용한 악성 문자열 필터링 어플리케이션 개발(PC, Mobile APP)",
        stack: "DeepLearning, Python, Chrome Extension, Java(Android), Swift(IOS), Javascript",
        takeway:
            "어느날 문득 '언제까지 사람들이 악플에 시달리며 고통받아야할까'라는 생각이 들었고 최근 이슈되고 있는 인공지능 기술을 이용해서 악성 댓글을 포함한 모든 악의적인 문자열을 치환할 수 있을까라는 생각을 했습니다. 이 생각을 바로 실천에 옮겨 기존에 나와있는 악성 댓글을 필터링하는 네이버 \"클린봇\" 등은 해당 댓글에서만 기능을 발휘하지만 이보다 더 많이 필터링할 수 있는 것을 개발해보고 싶었습니다. 그래서 크롬 확장프로그램을 이용해서 서버와 통신하여 실시간으로 악성 문자열을 필터링 할 수 있는 프로그램을 만들었고, 크롤링 및 오픈 데이터로 인공지능에 학습할 약 9만 2천여개의 데이터셋을 직접 만들었습니다. 그럼에도 정확도는 비록 높진 않았지만 제가 의도한대로 프로그램은 악성 문자열을 잘 필터링하였고, 기사의 댓글뿐만 아니라 실시간 방송의 채팅까지도 필터링 할 수 있게 개발을 성공하였습니다. 혼자서 기획, 계획, 개발, 수정, 검토를 모두 진행하며 여태까지 개발 경험 중 제일 많이 배웠던 시간이였습니다.",
        image: "extension",
    },
    {
        title: "한이음 프로젝트",
        start: "2020. 5. 1.",
        end: "2020. 11. 30.",
        introduce: "디바이스 드라이버를 통한 랩톱 보안 소프트웨어 개발",
        stack: "Python, PyQt5, Java(Android), OpenCV, C(Win Driver)",
        takeway:
            '더 편하게, 더 안전하게 공공장소에서도 노트북의 보안을 강화할 수 없을까?라는 주제로 약 6개월간 ICT기업전문가(멘토)님과 팀을 이루어 프로젝트를 수행함으로써 실무 역량을 향상시켰습니다. 수행한 프로젝트명은 "디바이스 드라이버를 활용한 랩톱 보안 소프트웨어"로 얼굴인식을 활용하여 노트북의 잠금을 디바이스 드라이버단에서 차단할 수 있게하는 프로그램 개발 프로젝트였습니다. 당시 파이썬을 이용한 메인 프로그램 제작과 자바 언어를 이용한 모바일 어플리케이션 개발도 같이 하였습니다. 모바일 앱 같은 경우 현재 코로나 시국으로 인해 얼굴인식이 원활하지 않아 그 단점을 해결하고자 블루투스를 연동시킨 모바일로 잠금해제하기 위해 개발하였습니다. 따라서 얼굴인식을 통한 잠금해제 말고도 모바일을 통해 텍스트 전송 혹은 음성 인식을 통해 노트북의 잠금을 해제할 수 있었습니다. 개발 결과 메인 프로그램과 모바일 앱 모두 완성시켰으나 윈도우 드라이버 개발에서 어려움을 겪어 약 90%정도 완성시키고 마무리하였습니다. 비록 완성품을 만들어내진 못했지만 생각보다 높은 완성률을 이뤄냈다는 것과 팀원과의 프로젝트는 어떤식으로 분담하여 진행하는지, 어떤 식으로 협업하는지 등을 멘토님을 통해 배울 수 있어서 좋았던 시간이였습니다.',
        image: "hanium",
    },
    {
        title: "스케줄 매니저",
        start: "2022. 7. 17.",
        end: "2022. 9. 30.",
        introduce:
            "단순 반복 문서 작업을 위해 자동으로 반복 생성되는 웹사이트 개발",
        stack: "Vue, Node.js, MySQL, Bootstrap, Github, Heroku",
        takeway:
            "팀원끼리 일정을 공유하면서 주기적으로 보고해야하는 문서, 결재 받아야하는 문서 등을 자동으로 생성해주는 웹사이트를 개발하고자 했습니다. 일정을 추가하면 해당 첨부파일이 주기적으로 자동 생성이 되고, 해당 날짜에 맞게 내용도 바뀌게끔 설계하려 하였으나 개발 도중 해당 아이디어가 웹사이트로 이용했을 시 편의성, 보안성, 규모 등을 고려했을 때 웹사이트가 아닌 응용SW로 개발하는 것이 더 효율적일 것 같다는 생각을 하여 미완성으로 마무리하였습니다. 하지만 구축한 코드에는 로그인과 일정 업로드, 수정, 삭제 기능을 구현해놓았으며 풀스택 기초 설계 부분에서 학습한 경험이였던 것 같습니다. 개발하면서 초기 디자인과 설계의 중요성을 매우 느꼈으며 특히 반복되는 문서의 복사의 경우 문서를 파싱하여 해당 날짜에 맞게 문서를 재작성하고 다시 업로드를 해야하는데 혼자서 안정적으로 개발하기엔 한계를 느껴 팀원이 이만큼 중요하구나 하는 생각도 하였습니다.",
        image: "vue",
    },
    {
        title: "포트폴리오 (feat. Gatsby)",
        start: "2021. 7. 18.",
        end: "2021. 11. 21.",
        introduce: "React 프레임워크(Gatsby)를 이용한 정적 포트폴리오 사이트",
        stack: "React, Gatsby, Node.js, Typescript, SCSS, Github",
        takeway:
            "React의 정적 페이지 학습을 위해 Gatsby를 이용하여 포트폴리오 사이트를 한번 구현해보았습니다. 정적 페이지라 백엔드나 DB와 연결하지 않으며 동적으로 스크립트를 통해 웹페이지는 변경하지 않아 구현하는데 있어 Section 단위로 관리해주면 돼서 규모자체는 굉장히 간단하였습니다. 다만 Adblock 프로그램의 영향이 조금 있었고, 포트폴리오 페이지이기 때문에 추가하고자 하는 요소가 발생하면 포트폴리오 내용을 하나로 모은 파일인 mock.js 파일을 결국 수정해야한다는 부분이 조금 불편한 점이였던 것 같습니다. 이 부분을 보완하고자 다음에 포트폴리오 사이트를 만약 만들게 된다면 백엔드 및 DB와도 연동시키고 자동으로 레이아웃을 생성하는 스크립트를 구현하여 포트폴리오 수정, 추가, 삭제 시 페이지에서 수정할 수 있는 페이지도 한번 만들어봐야겠다하는 다짐을 했습니다. 정적인 페이지는 규모가 워낙 간단하다는 매력이 있긴 하지만 더 깊고 디테일한 페이지 제작을 위해선 동적 웹페이지로 구현하는게 더 많은 case를 고려할 수 있겠구나 생각하였습니다.",
        image: "gatsby",
    },
];

const Project = () => {
    const [showModal, setShowModal] = useState(new Array(data.length));

    function Project() {
        let result = [];

        for (let i = 0; i < data.length; i++) {
            result.push(
                <div className={styles.activityItem} key={"activity-item-" + i}>
                    <Image
                        src={"/project/" + data[i].image + ".webp"}
                        alt={data[i].title}
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
                        image={"/project/" + data[i].image + ".webp"}
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
                        <div>기술스택 : {data[i].stack}</div>
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
            let pageTitle = document.getElementById(
                "#pageTitle"
            ) as HTMLElement;
            pageTitle.style.opacity = "0";
        }, 1000);
        setTimeout(() => {
            let pageTitle = document.getElementById(
                "#pageTitle"
            ) as HTMLElement;
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
            <div id="pageTitle">Project</div>
            <section className={styles.activity}>
                <h1 className={styles.activityTitle}>Activities</h1>
                {Project()}
            </section>
        </main>
    );
};

export default Project;
