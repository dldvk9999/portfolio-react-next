import styles from "../styles/Home.module.scss";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerItem}>
                Powered by{" "}
                <Link
                    href={
                        "https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    }
                >
                    <a>
                        <span className={styles.logo}>
                            <img
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                width="72"
                                height="16"
                            />
                        </span>
                    </a>
                </Link>
            </div>
            <div className={styles.footerItem}>
                Made by{" "}
                <Link href={"https://github.com/dldvk9999"}>
                    <a id="navMakerNickname">JongGeun</a>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
