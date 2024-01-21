import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@styles/Home.module.scss";
import { get } from "@api/api";
import { scrollUp, hideTitle } from "pages/common";
import type { infoCategory, skillCategory } from "@type/about/type";

const About = () => {
    const [information, setInfo] = useState<infoCategory>({
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
            // let info = res.data.data[0];
            const info = res;
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
        const result = [];
        for (const key in information) {
            result.push(
                <div key={"about-info-" + key}>
                    <h2>{key}</h2>
                    <p>{isLink(key, information[key])}</p>
                </div>
            );
        }
        return result;
    }

    // 인적사항 중 링크 적용 및 나이 자동 계산
    const isLink = (key: string, item: string) => {
        const result = [];
        switch (key) {
            case "블로그":
            case "깃허브":
                result.push(
                    <a href={item} target="_blank" rel="noopener noreferrer nofollow" key={"about-info-blog-" + key}>
                        {item}
                    </a>
                );
                break;
            case "Email":
                result.push(
                    <a href={"mailto:" + item} key={"about-info-email-" + key}>
                        {item}
                    </a>
                );
                break;
            case "Tel":
                result.push(
                    <a href={"tel:" + item} key={"about-info-tel-" + key}>
                        {item}
                    </a>
                );
                break;
            case "출생":
                const age = new Date().getFullYear() - Number(item.slice(0, 4));
                item = item + " (" + age.toString() + "세)";
                result.push(item);
                break;
            default:
                result.push(item);
        }
        return result;
    };

    // 스킬 출력
    function skills() {
        const result = [];
        for (const key in infoskills) {
            result.push(
                <div className={styles.skillLayout} key={"about-skill-" + key}>
                    <h2>{key}</h2>
                    {skillItems(key)}
                </div>
            );
        }
        return result;
    }

    // 스킬 아이템 출력
    function skillItems(category: string) {
        const result = [];
        for (const value of infoskills[category]) {
            result.push(
                <ul key={"about-skillItems-" + value}>
                    <li>{value}</li>
                </ul>
            );
        }
        return result;
    }

    useEffect(() => {
        // 스크롤 상단 위치
        scrollUp();
        // 타이틀 숨김
        hideTitle();
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
