import Link from "next/link";
import styles from "../styles/Home.module.scss";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/about">
                <a>About</a>
            </Link>
            <Link href="/activity">
                <a>Activity</a>
            </Link>
            <Link href="/project">
                <a>Project</a>
            </Link>
        </header>
    );
};

export default Header;
