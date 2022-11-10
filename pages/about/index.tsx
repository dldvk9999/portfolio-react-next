import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import { useEffect } from "react";

const About = () => {
    const header = [
        "이름",
        "출생",
        "최종학력",
        "경력사항",
        "Tel",
        "Email",
        "블로그",
        "깃허브",
    ];
    const content = [
        "박종근",
        "1998.01.05.",
        "수원대학교 정보보호학과 졸업",
        "신입",
        "010-7184-6533",
        "dldvk9999@naver.com",
        "https://blog.naver.com/dldvk9999",
        "https://github.com/dldvk9999",
    ];
    const skillLanguage = [
        "Python",
        "Javascript",
        "Typescript",
        "HTML",
        "CSS",
        "Java",
        "Swift",
        "C",
        "C++",
    ];
    const skillFrontend = [
        "React",
        "Angular",
        "Vue",
        "JQuery",
        "Sass",
        "Nestjs",
        "Gatsby",
        "Bootstrap",
    ];
    const skillBackend = ["Nodejs", "Django", "Mysql", "MariaDB", "PostgreSQL"];
    const skillPlatform = [
        "PC Software",
        "Web.Frontend",
        "Web.Backend",
        "Chrome Extension",
        "Android App",
        "IOS App",
    ];
    const skillCommunication = [
        "Slack",
        "Jira",
        "Microsoft Teams",
        "Zoom",
        "Figma",
    ];
    const skillVersionControl = ["Git", "Github"];
    const skillDeployment = ["Vercel", "Heroku", "Github"];
    const skillCertification = ["정보처리기사"];
    const skillKeys = [
        "Language",
        "Frontend",
        "Backend",
        "Platform",
        "Communication",
        "VersionControl",
        "Deployment",
        "Certification",
    ];
    const skillArea = [
        skillLanguage,
        skillFrontend,
        skillBackend,
        skillPlatform,
        skillCommunication,
        skillVersionControl,
        skillDeployment,
        skillCertification,
    ];

    function info() {
        let result = [];

        for (let i = 0; i < header.length; i++) {
            result.push(
                <div key={"about-info-" + i}>
                    <h2>{header[i]}</h2>
                    <p>{isLink(i, content[i])}</p>
                </div>
            );
        }
        return result;
    }

    const isLink = (index: number, item: string) => {
        let result = [];
        // 블로그, 깃허브 주소일 경우
        if (index >= header.length - 2) {
            result.push(
                <a
                    href={item}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={"about-info-blog-" + index}
                >
                    {item}
                </a>
            );
        }
        // 이메일 주소일 경우
        else if (index == 5) {
            result.push(
                <a href={"mailto:" + item} key={"about-info-email-" + index}>
                    {item}
                </a>
            );
        }
        // 전화번호일 경우
        else if (index == 4) {
            result.push(
                <a href={"tel:" + item} key={"about-info-tel-" + index}>
                    {item}
                </a>
            );
        }
        // 출생일 경우 (끝에 현재 나이 추가)
        else if (index == 1) {
            const age = new Date().getFullYear() - Number(item.slice(0, 4)) + 1;
            item = item + " (" + age.toString() + "세)";
            result.push(item);
        }
        // 그 외
        else {
            result.push(item);
        }
        return result;
    };

    function skills() {
        let result = [];

        for (let i = 0; i < skillKeys.length; i++) {
            result.push(
                <div key={"about-skill-" + i}>
                    <h2>{skillKeys[i]}</h2>
                    {skillItems(i)}
                </div>
            );
        }

        return result;
    }

    function skillItems(index: number) {
        let result = [];
        for (let i = 0; i < skillArea[index].length; i++) {
            result.push(
                <ul key={"about-skillItems-" + i}>
                    <li>{skillArea[index][i]}</li>
                </ul>
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

    return (
        <main className={styles.main}>
            <h1 id="pageTitle">About</h1>
            <section className={styles.profile}>
                <Image
                    alt="profile image"
                    className={styles.profileImage}
                    src={"/about/profile.webp"}
                    width={500}
                    height={500}
                    priority
                />
                <div className={styles.profileInfo}>{info()}</div>
            </section>
            <section className={styles.skills}>{skills()}</section>
        </main>
    );
};

export default About;
