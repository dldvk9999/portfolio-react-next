import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function MyDocument() {
    // nav 창 닫음
    function closeNav() {
        const nav = document.querySelector("#nav");
        nav?.classList.remove("active");
    }

    // 접속 가능한 주소 출력
    function routerList() {
        const pageList = ["", "about", "activity", "project", "site"];
        const pageName = ["Home", "About", "Activity", "Project", "Site"];
        const result = [];

        for (let i = 0; i < pageList.length; i++) {
            // if (pageList[i] === "admin") {
            //     result.push(<hr id="nav-hr" key={"nav-router-hr"} />);
            // }
            result.push(
                <Link href={"/" + pageList[i]} key={"nav-router-" + i}>
                    <a onClick={closeNav}>
                        <b>{pageName[i]}</b>
                    </a>
                </Link>
            );
        }

        return result;
    }

    return (
        <Html lang="ko">
            <Head>
                {process.env.NODE_ENV === "production" && (
                    <>
                        <meta httpEquiv="Content-Security-Policy" />
                        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                    </>
                )}
                <link rel="manifest" href="/manifest.json" />
            </Head>

            <body>
                <nav id="nav">
                    <div>
                        <div id="navClose">
                            <button aria-label="navigation close button">
                                <svg viewBox="0 0 120.64 122.88" width="17" height="17" xmlSpace="preserve">
                                    <path d="M66.6,108.91c1.55,1.63,2.31,3.74,2.28,5.85c-0.03,2.11-0.84,4.2-2.44,5.79l-0.12,0.12c-1.58,1.5-3.6,2.23-5.61,2.2 c-2.01-0.03-4.02-0.82-5.55-2.37C37.5,102.85,20.03,84.9,2.48,67.11c-0.07-0.05-0.13-0.1-0.19-0.16C0.73,65.32-0.03,63.19,0,61.08 c0.03-2.11,0.85-4.21,2.45-5.8l0.27-0.26C20.21,37.47,37.65,19.87,55.17,2.36C56.71,0.82,58.7,0.03,60.71,0 c2.01-0.03,4.03,0.7,5.61,2.21l0.15,0.15c1.57,1.58,2.38,3.66,2.41,5.76c0.03,2.1-0.73,4.22-2.28,5.85L19.38,61.23L66.6,108.91 L66.6,108.91z M118.37,106.91c1.54,1.62,2.29,3.73,2.26,5.83c-0.03,2.11-0.84,4.2-2.44,5.79l-0.12,0.12 c-1.57,1.5-3.6,2.23-5.61,2.21c-2.01-0.03-4.02-0.82-5.55-2.37C89.63,101.2,71.76,84.2,54.24,67.12c-0.07-0.05-0.14-0.11-0.21-0.17 c-1.55-1.63-2.31-3.76-2.28-5.87c0.03-2.11,0.85-4.21,2.45-5.8C71.7,38.33,89.27,21.44,106.8,4.51l0.12-0.13 c1.53-1.54,3.53-2.32,5.54-2.35c2.01-0.03,4.03,0.7,5.61,2.21l0.15,0.15c1.57,1.58,2.38,3.66,2.41,5.76 c0.03,2.1-0.73,4.22-2.28,5.85L71.17,61.23L118.37,106.91L118.37,106.91z" />
                                </svg>
                            </button>
                        </div>
                        <div id="navList">{routerList()}</div>
                    </div>
                    <div id="navFooter">
                        <p id="navMaker">
                            Made by{" "}
                            <Link href={"https://github.com/dldvk9999"}>
                                <a id="navMakerNickname">JongGeun</a>
                            </Link>
                        </p>
                    </div>
                </nav>

                <div id="root">
                    <Main />
                    <NextScript />
                </div>

                <button id="floating">&uarr;</button>
            </body>
        </Html>
    );
}
