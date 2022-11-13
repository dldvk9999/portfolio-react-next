import { useEffect } from "react";
import styles from "../../styles/Home.module.scss";

const Site = () => {
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

    return (
        <main className={styles.main}>
            <h1 id="pageTitle">Site</h1>
            <div>This is Site Page</div>
        </main>
    );
};

export default Site;
