import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

const Header = () => {
    const [isDarkMode, setChecked] = useState(true);
    let isOpen = false;

    function openNav() {
        let nav = document.querySelector("#nav");
        nav?.classList.add("active");
        isOpen = true;
    }

    function closeNav() {
        let nav = document.querySelector("#nav");
        nav?.classList.remove("active");
        isOpen = false;
    }

    function navCloseButton(event: any) {
        if (event.tagName === "svg" || event.tagName === "path") {
            closeNav();
        }
    }

    function routerList() {
        const pageList = ["", "about", "activity", "project", "site"];
        const pageName = ["Home", "About", "Activity", "Project", "Site"];
        let result = [];

        for (let i = 0; i < pageList.length; i++) {
            result.push(
                <Link href={"/" + pageList[i]} key={"header-router-" + i}>
                    <a onClick={closeNav}>{pageName[i]}</a>
                </Link>
            );
        }

        return result;
    }

    function darkmodeSwitch() {
        return (
            <div className={styles.headerDarkmodeSwitch}>
                <input
                    type="checkbox"
                    className={styles.headerDarkmodeCheckbox}
                    checked={isDarkMode}
                    aria-label="dark mode switch"
                    readOnly
                />
                <svg
                    className={`${styles.headerIconDarkmode} ${
                        isDarkMode ? styles.turnOnSun : styles.turnOffSun
                    }
                    `}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    onClick={(e) => checkHandler(e)}
                    aria-label="dark mode off"
                >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path>
                </svg>
                <svg
                    className={`${styles.headerIconDarkmode} ${
                        isDarkMode ? styles.turnOffMoon : styles.turnOnMoon
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    onClick={(e) => checkHandler(e)}
                    aria-label="dark mode on"
                >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path>
                </svg>
            </div>
        );
    }

    // dark mode handler
    const checkHandler = ({}) => {
        setChecked(!isDarkMode);
        localStorage.setItem("darkmode", (!isDarkMode).toString());
    };

    useEffect(() => {
        // dark mode 설정. localstorage 값으로 초기화
        if (localStorage.getItem("darkmode") === null)
            localStorage.setItem("darkmode", "true");
        setChecked(localStorage.getItem("darkmode") === "true");

        window.onresize = () => {
            if (window.innerWidth > 600) {
                closeNav();
            }
        };

        window.onclick = (e) => {
            if (isOpen) {
                const id = e.target as HTMLButtonElement;
                const nav = [
                    "nav",
                    "navClose",
                    "navFooter",
                    "navList",
                    "nav-hr",
                    "navMenu",
                    "navMenuSvg",
                    "navMenuPath",
                ];
                if (nav.indexOf(id.id) === -1) {
                    closeNav();
                }
            }
        };
    }, []);

    useEffect(() => {
        // close button 이벤트 리스너 설정
        document
            .querySelector("#navClose")!
            .addEventListener("click", (e) => navCloseButton(e.target));

        return () => {
            document
                .querySelector("#navClose")!
                .removeEventListener("click", (e) => navCloseButton(e.target));
        };
    }, [navCloseButton]);

    useEffect(() => {
        // dark mode 적용
        document
            .getElementsByTagName("html")[0]
            .setAttribute("class", isDarkMode ? "dark" : "light");
    });

    return (
        <header className={styles.header}>
            <div className={styles.menudarkmode}>
                <button
                    id="navMenu"
                    className={styles.menu}
                    onClick={openNav}
                    aria-label="menu"
                >
                    <svg
                        id="navMenuSvg"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                    >
                        <path
                            id="navMenuPath"
                            d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"
                        />
                    </svg>
                </button>
                {darkmodeSwitch()}
            </div>
            <div className={styles.headerList}>
                <div className={styles.headerRouters}>{routerList()}</div>
                <div className={styles.headerAdmin}>
                    {darkmodeSwitch()}
                    <Link href="/admin">
                        <a onClick={closeNav}>Admin</a>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
