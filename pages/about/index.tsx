import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import { get } from "../api/api";
import { useEffect, useState } from "react";

type skillCategory = {
    [key: string]: Array<string>;
};

const About = () => {
    const [information, setInfo] = useState({
        이름: "",
        출생: "",
        최종학력: "",
        경력사항: "",
        Tel: "",
        Email: "",
        블로그: "",
        깃허브: "",
    });
    const [infoskills, setSkills] = useState<skillCategory>({
        Language: [],
        Frontend: [],
        Backend: [],
        Platform: [],
        Communication: [],
        VersionControl: [],
        Deployment: [],
        Certification: [],
    });

    // DB에서 info 가져오기
    function getInfo() {
        get("about").then((res: any) => {
            let info = res.data.data[0];
            setInfo({
                이름: info.name,
                출생:
                    new Date(info.birth).getFullYear() +
                    "." +
                    (new Date(info.birth).getMonth() + 1) +
                    "." +
                    new Date(info.birth).getDate(),
                최종학력: info.lastgraduate,
                경력사항: info.isnew === 0 ? "신입" : info.isnew + "년",
                Tel: info.tel,
                Email: info.email,
                블로그: info.blog,
                깃허브: info.github,
            });
            setSkills({
                Language: info.language.split(","),
                Frontend: info.frontend.split(","),
                Backend: info.backend.split(","),
                Platform: info.platform.split(","),
                Communication: info.communication.split(","),
                VersionControl: info.versioncontrol.split(","),
                Deployment: info.deployment.split(","),
                Certification: info.certification.split(","),
            });
        });
    }

    // 내 인적사항 출력
    function info() {
        let result = [];

        for (let i = 0; i < Object.keys(information).length; i++) {
            result.push(
                <div key={"about-info-" + i}>
                    <h2>{Object.keys(information)[i]}</h2>
                    <p>{isLink(i, Object.values(information)[i])}</p>
                </div>
            );
        }
        return result;
    }

    // 인적사항 중 링크 적용 및 나이 자동 계산
    const isLink = (index: number, item: string) => {
        let result = [];
        // 블로그, 깃허브 주소일 경우
        if (index >= 6) {
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
        else if (index === 5) {
            result.push(
                <a href={"mailto:" + item} key={"about-info-email-" + index}>
                    {item}
                </a>
            );
        }
        // 전화번호일 경우
        else if (index === 4) {
            result.push(
                <a href={"tel:" + item} key={"about-info-tel-" + index}>
                    {item}
                </a>
            );
        }
        // 출생일 경우 (끝에 현재 나이 추가)
        else if (index === 1) {
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

    // 스킬 출력
    function skills() {
        let result = [];

        for (let i = 0; i < Object.keys(infoskills).length; i++) {
            result.push(
                <div className={styles.skillLayout} key={"about-skill-" + i}>
                    <h2>{Object.keys(infoskills)[i]}</h2>
                    {skillItems(Object.keys(infoskills)[i])}
                </div>
            );
        }

        return result;
    }

    // 스킬 아이템 출력
    function skillItems(category: string) {
        let result = [];
        for (let i = 0; i < infoskills[category].length; i++) {
            result.push(
                <ul key={"about-skillItems-" + i}>
                    <li>{infoskills[category][i]}</li>
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

        // DB에서 info 가져오기
        getInfo();
    }, []);

    return (
        <main className={styles.main}>
            <div id="pageTitle">About</div>
            <section className={styles.profile}>
                <h1 className={styles.profileTitle}>Profile</h1>
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
            <section className={styles.skills}>
                <h1 className={styles.skillsTitle}>Skills</h1>
                {skills()}
            </section>
        </main>
    );
};

export default About;
