import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Image from "next/image";

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
                            <Image
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                width={72}
                                height={16}
                                loading="lazy"
                            />
                        </span>
                    </a>
                </Link>
            </div>
            <div className={styles.footerItem}>
                Made by{" "}
                <Link href={"https://github.com/dldvk9999"}>
                    <a className={styles.navMakerNickname}>JongGeun</a>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
