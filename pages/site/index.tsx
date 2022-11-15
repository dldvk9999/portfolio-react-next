import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Home.module.scss";

const Site = () => {
    const [data, setData] = useState();

    async function rawHTML() {
        try {
            return await axios
                .get("https://portfolio-react-next-dldvk9999.vercel.app/")
                .then((html) => setData(html.data));
        } catch (e) {
            console.log(e);
        }
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

        // rawHTML();
    }, []);

    return (
        <main className={styles.main}>
            <h1 id="pageTitle">Site</h1>
            <section className={styles.site}>
                <a
                    href="https://github.com/dldvk9999/portfolio-react-next"
                    className={styles.siteGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Github로 이동
                </a>

                {/* <textarea
                    className={styles.siteCode}
                    value={rawHTML()}
                    readOnly
                /> */}
                {/* <div>{data}</div> */}
                <iframe
                    frameBorder={0}
                    className={styles.siteCode}
                    scrolling="no"
                    seamless
                    srcDoc='<html><body><style type="text/css">.gist .gist-data { height: 400px; }</style><script src="https://github.dev/dldvk9999/portfolio-react-next/blob/main/"></script></body></html>'
                ></iframe>
            </section>
        </main>
    );
};

export default Site;
