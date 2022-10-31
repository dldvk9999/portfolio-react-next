import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/Home.module.scss";

const Header = () => {
    function openNav() {
        let nav = document.querySelector("#nav");
        nav?.classList.add("active");
    }

    function closeNav() {
        let nav = document.querySelector("#nav");
        nav?.classList.remove("active");
    }

    function navCloseButton(event: any) {
        if (event.tagName === "svg") {
            closeNav();
        }
    }

    function routerList() {
        return (
            <>
                <Link href="/">
                    <a onClick={closeNav}>Home</a>
                </Link>
                <Link href="/about">
                    <a onClick={closeNav}>About</a>
                </Link>
                <Link href="/activity">
                    <a onClick={closeNav}>Activity</a>
                </Link>
                <Link href="/project">
                    <a onClick={closeNav}>Project</a>
                </Link>
            </>
        );
    }

    useEffect(() => {
        window.onresize = () => {
            if (window.innerWidth > 600) {
                closeNav();
            }
        };

        document
            .querySelector("#navClose")!
            .addEventListener("click", (e) => navCloseButton(e.target));

        return () => {
            document
                .querySelector("#navClose")!
                .removeEventListener("click", (e) => navCloseButton(e.target));
        };
    }, []);

    return (
        <header className={styles.header}>
            <button className={styles.menu} onClick={openNav}>
                <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                >
                    <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
                </svg>
            </button>
            <div className={styles.headerList}>
                <div className={styles.headerRouters}>{routerList()}</div>
                <div className={styles.headerAdmin}>
                    <Link href="/admin">
                        <a onClick={closeNav}>Admin</a>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
