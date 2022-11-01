import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import Scrollbar from "smooth-scrollbar";

const Home: NextPage = () => {
    const [titleSub, setTitleSub] = useState(false);
    const [downButton, setDownButton] = useState(false);
    const [grid1, setGrid1] = useState(false);
    const [grid2, setGrid2] = useState(false);

    const downArrow = () => {
        Scrollbar.get(
            document.querySelector("#root") as HTMLElement
        )?.setMomentum(0, window.innerHeight + 16 * 4.5);
    };

    useEffect(() => {
        setTitleSub(true);
        setTimeout(() => {
            setDownButton(true);
        }, 3000);
    }, []);

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
                            If it&apos;s good, it&apos;s wonderful. <br />
                            If it&apos;s bad, it&apos;s experience.
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

                <div className={styles.grid}>
                    <Link href="/about">
                        <a className={styles.card}>
                            <img
                                src="about.webp"
                                alt="about"
                                className={styles.cardImage}
                            />
                            <div className={styles.cardContents}>
                                <h2>About &rarr;</h2>
                                <p>
                                    나를 소개하는 페이지입니다. 생년월일, 학력,
                                    이미지 등 기본 인적사항을 보여줍니다.
                                </p>
                            </div>
                        </a>
                    </Link>

                    <Link href="/activity">
                        <a className={styles.card}>
                            <img
                                src="activity.webp"
                                alt="activity"
                                className={styles.cardImage}
                            />
                            <div className={styles.cardContents}>
                                <h2>Activity &rarr;</h2>
                                <p>
                                    수료한 활동 및 교육 내용을 소개하며 어떤
                                    주제로 활동을 했었는지, 어떤 내용을
                                    교육들었는지 구체적으로 소개합니다.
                                </p>
                            </div>
                        </a>
                    </Link>

                    <Link href="/project">
                        <a className={styles.card}>
                            <img
                                src="project.webp"
                                alt="project"
                                className={styles.cardImage}
                            />
                            <div className={styles.cardContents}>
                                <h2>Project &rarr;</h2>
                                <p>
                                    참여한 프로젝트를 소개합니다. 그 곳에서 어떤
                                    포지션을 맡았는지 어떻게 개발하며
                                    협업했는지를 기술합니다.
                                </p>
                            </div>
                        </a>
                    </Link>

                    <Link href="/site">
                        <a className={styles.card}>
                            <img
                                src="site.webp"
                                alt="site"
                                className={styles.cardImage}
                            />
                            <div className={styles.cardContents}>
                                <h2>This Site &rarr;</h2>
                                <p>
                                    이 사이트의 구조 및 설계를 소개하고 코드를
                                    공개합니다.
                                </p>
                            </div>
                        </a>
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Home;
