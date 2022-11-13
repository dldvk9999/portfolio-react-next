import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import Scrollbar from "smooth-scrollbar";
import Image from "next/image";

const pageList = ["about", "activity", "project", "site"];
const pageName = ["About", "Activity", "Project", "Site"];
const pageDesc = [
    "나를 소개하는 페이지입니다. 생년월일, 학력, 이미지 등 기본 인적사항을 보여줍니다.",
    "수료한 활동 및 교육 내용을 소개하며 어떤 주제로 활동을 했었는지, 어떤 내용을 교육들었는지 구체적으로 소개합니다.",
    "참여한 프로젝트를 소개합니다. 그 곳에서 어떤 포지션을 맡았는지 어떻게 개발하며 협업했는지를 기술합니다.",
    "이 사이트의 구조 및 설계를 소개하고 코드를 공개합니다.",
];

const Home: NextPage = () => {
    const [titleSub, setTitleSub] = useState(false);
    const [downButton, setDownButton] = useState(false);

    // ScrollBar 리스너 => 특정 스크롤에 도달하면 layout slide in 처리.
    function scrollBarListener(
        scrollBar: any,
        index: number,
        maxLength: number
    ) {
        if (window.innerWidth >= 1024) {
            if (
                Number(scrollBar!.scrollTop) >=
                (window.innerHeight +
                    window.innerHeight * (Math.trunc(index / 2) / maxLength)) *
                    0.6
            ) {
                setStateItemsFunc(index);
            }
        } else {
            if (
                Number(scrollBar!.scrollTop) >=
                (window.innerHeight +
                    window.innerHeight * (index / maxLength)) *
                    0.8
            ) {
                setStateItemsFunc(index);
            }
        }
    }

    // querySelector를 이용한 className 교체 (useState는 적용이 안됨)
    function setStateItemsFunc(index: number) {
        let card = document.querySelector("#card-" + index);
        const init = index % 2 === 0 ? "LeftInit" : "RightInit";
        const appear = index % 2 === 0 ? "LeftToRight" : "RightToLeft";
        card?.classList.remove(styles[`${init}`]);
        card?.classList.add(styles[`${appear}`]);
    }

    // pages layout for문 처리
    function pages() {
        const result = [];
        for (let i = 0; i < pageList.length; i++) {
            const init = i % 2 === 0 ? "LeftInit" : "RightInit";
            result.push(
                <Link href={"/" + pageList[i]} key={"main-router-" + i}>
                    <a
                        id={"card-" + i}
                        className={`${styles.card} ${styles[`${init}`]}`}
                    >
                        <Image
                            alt={pageList[i]}
                            className={styles.cardImage}
                            src={"/home/" + pageList[i] + ".webp"}
                            width={1000}
                            height={1000}
                            loading="lazy"
                        />
                        <div className={styles.cardContents}>
                            <h2>{pageName[i]} &rarr;</h2>
                            <p>{pageDesc[i]}</p>
                        </div>
                    </a>
                </Link>
            );
        }
        return result;
    }

    // 아래 스크롤 버튼 클릭 시 이벤트 처리
    const downArrow = () => {
        const scroll = Scrollbar.get(
            document.querySelector("#root") as HTMLElement
        );
        scroll?.setMomentum(0, window.innerHeight);
    };

    // 모바일의 경우 Scrollbar.get()이 늦을 수도 있어 늦을 경우 비동기 처리로 리스너 등록
    async function scrollBarListenerAsync(i: number) {
        setTimeout(() => {
            const scroll = Scrollbar.get(
                document.querySelector("#root") as HTMLElement
            );
            scroll!.addListener(() =>
                scrollBarListener(scroll, i, pageList.length)
            );
        }, 500);
    }

    useEffect(() => {
        // 페이지 최초 로드 시 title과 DownButton 순차적으로 출력
        setTitleSub(true);
        setTimeout(() => {
            setDownButton(true);
        }, 2000);
    }, []);

    useEffect(() => {
        // ScrollBar 리스너 등록
        const scroll = Scrollbar.get(
            document.querySelector("#root") as HTMLElement
        );
        for (let i = 0; i < pageList.length; i++) {
            if (scroll) {
                scroll.addListener(() =>
                    scrollBarListener(scroll, i, pageList.length)
                );
            } else {
                scrollBarListenerAsync(i);
            }
        }

        // 만약 viewport 너비가 좁은 상태에서 layout을 하나씩 slide in했다가 너비가 넓어졌을 경우 다른 layout들이 알맞게 자동으로 노출되게 설정
        window.onresize = () => {
            for (let i = 0; i < pageList.length; i++)
                scrollBarListener(scroll, i, pageList.length);
        };

        return () => {
            // ScrollBar 리스너 해제
            for (let i = 0; i < pageList.length; i++) {
                scroll?.removeListener(() =>
                    scrollBarListener(scroll, i, pageList.length)
                );
            }
        };
    }, [scrollBarListener, scrollBarListenerAsync]);

    return (
        <main className={styles.main}>
            <section>
                <div className={styles.titleSubArrow}>
                    <div
                        className={`${styles.titleSub} ${
                            titleSub && styles.show
                        }`}
                    >
                        <h1 className={styles.title}>
                            <div>
                                If it&apos;s good, it&apos;s wonderful. <br />
                                If it&apos;s bad, it&apos;s experience.
                            </div>
                        </h1>

                        <p className={styles.description}>
                            - by <i>Carol A. Turkington</i>
                        </p>
                    </div>

                    <div
                        className={`${styles.downArrow} ${
                            downButton && styles.show
                        }`}
                    >
                        <button
                            onClick={downArrow}
                            aria-label="scroll down button"
                        >
                            <svg
                                width="40"
                                height="40"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                stroke="gray"
                                viewBox="-1 -1 26 26"
                            >
                                <path d="M24 12c0-6.623-5.377-12-12-12s-12 5.377-12 12 5.377 12 12 12 12-5.377 12-12zm-1 0c0-6.071-4.929-11-11-11s-11 4.929-11 11 4.929 11 11 11 11-4.929 11-11zm-11.5 4.828l-3.763-4.608-.737.679 5 6.101 5-6.112-.753-.666-3.747 4.604v-11.826h-1v11.828z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={styles.grid}>{pages()}</div>
            </section>
        </main>
    );
};

export default Home;
