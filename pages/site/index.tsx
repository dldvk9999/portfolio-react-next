import React, { useEffect, useState } from "react";
import axios from "axios";
import Scrollbar from "smooth-scrollbar";
import styles from "../../styles/Home.module.scss";

const Site = () => {
    const [data, setData] = useState("");
    const [tree, setTree] = useState<JSX.Element[]>();
    const [show, setShow] = useState(0);

    // next.config.js에서 /api 주소 프록시
    const rawURL = "/api";

    // 코드가 상당히 길고 난잡해 보이나 Github API의 불필요한 API 요청을 줄임 (token 존재 시 시간당 최대 15000회 가능)
    function makeTree() {
        let result = [];
        result.push(
            <div className={styles.siteTreeList} key={"site-tree"}>
                root
                <ul>
                    <li>
                        components
                        <ul>
                            <li
                                onClick={() =>
                                    rawHTML("/components/Header.tsx")
                                }
                            >
                                Header.tsx
                            </li>
                            <li
                                onClick={() =>
                                    rawHTML("/components/Footer.tsx")
                                }
                            >
                                Footer.tsx
                            </li>
                            <li
                                onClick={() => rawHTML("/components/Modal.tsx")}
                            >
                                Modal.tsx
                            </li>
                        </ul>
                    </li>
                    <li>
                        pages
                        <ul>
                            <li>
                                about
                                <ul>
                                    <li
                                        onClick={() =>
                                            rawHTML("/pages/about/index.tsx")
                                        }
                                    >
                                        index.tsx
                                    </li>
                                </ul>
                            </li>
                            <li>
                                activity
                                <ul>
                                    <li
                                        onClick={() =>
                                            rawHTML("/pages/activity/index.tsx")
                                        }
                                    >
                                        index.tsx
                                    </li>
                                </ul>
                            </li>
                            <li>
                                admin
                                <ul>
                                    <li
                                        onClick={() =>
                                            rawHTML("/pages/admin/index.tsx")
                                        }
                                    >
                                        index.tsx
                                    </li>
                                </ul>
                            </li>
                            <li>
                                project
                                <ul>
                                    <li
                                        onClick={() =>
                                            rawHTML("/pages/project/index.tsx")
                                        }
                                    >
                                        index.tsx
                                    </li>
                                </ul>
                            </li>
                            <li>
                                site
                                <ul>
                                    <li
                                        onClick={() =>
                                            rawHTML("/pages/site/index.tsx")
                                        }
                                    >
                                        index.tsx
                                    </li>
                                </ul>
                            </li>
                            <li onClick={() => rawHTML("/pages/_app.tsx")}>
                                _app.tsx
                            </li>
                            <li onClick={() => rawHTML("/pages/_document.tsx")}>
                                _document.tsx
                            </li>
                            <li onClick={() => rawHTML("/pages/index.tsx")}>
                                index.tsx
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => setData("이 파일은 공개하지 않습니다.")}>
                        public
                    </li>
                    <li>
                        styles
                        <ul>
                            <li>
                                components
                                <ul>
                                    <li
                                        onClick={() =>
                                            rawHTML(
                                                "/styles/components/Footer.scss"
                                            )
                                        }
                                    >
                                        Footer.scss
                                    </li>
                                    <li
                                        onClick={() =>
                                            rawHTML(
                                                "/styles/components/Header.scss"
                                            )
                                        }
                                    >
                                        Header.scss
                                    </li>
                                    <li
                                        onClick={() =>
                                            rawHTML(
                                                "/styles/components/Modal.scss"
                                            )
                                        }
                                    >
                                        Modal.scss
                                    </li>
                                </ul>
                            </li>
                            <li>
                                pages
                                <ul>
                                    <li
                                        onClick={() =>
                                            rawHTML("/styles/pages/About.scss")
                                        }
                                    >
                                        About.scss
                                    </li>
                                    <li
                                        onClick={() =>
                                            rawHTML(
                                                "/styles/pages/Activity.scss"
                                            )
                                        }
                                    >
                                        Activity.scss
                                    </li>
                                    <li
                                        onClick={() =>
                                            rawHTML("/styles/pages/Admin.scss")
                                        }
                                    >
                                        Admin.scss
                                    </li>
                                    <li
                                        onClick={() =>
                                            rawHTML("/styles/pages/Home.scss")
                                        }
                                    >
                                        Home.scss
                                    </li>
                                    <li
                                        onClick={() =>
                                            rawHTML("/styles/pages/Site.scss")
                                        }
                                    >
                                        Site.scss
                                    </li>
                                </ul>
                            </li>
                            <li
                                onClick={() =>
                                    rawHTML("/styles/_variables.scss")
                                }
                            >
                                _variables.scss
                            </li>
                            <li onClick={() => rawHTML("/styles/globals.scss")}>
                                globals.scss
                            </li>
                            <li
                                onClick={() =>
                                    rawHTML("/styles/Home.module.scss")
                                }
                            >
                                Home.module.scss
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => rawHTML("/.eslintrc.json")}>
                        .eslintrc.json
                    </li>
                    <li onClick={() => rawHTML("/.gitignore")}>.gitignore</li>
                    <li onClick={() => rawHTML("/next.config.js")}>
                        next.config.js
                    </li>
                    <li onClick={() => rawHTML("/package.json")}>
                        package.json
                    </li>
                    <li onClick={() => rawHTML("/README.md")}>README.md</li>
                    <li onClick={() => rawHTML("/tsconfig.json")}>
                        tsconfig.json
                    </li>
                </ul>
            </div>
        );
        setTree(result);
    }

    // !!! TOKEN 값 임의 사용 절대 금지 !!!
    async function rawHTML(path: string) {
        try {
            await axios
                .get(rawURL + path, {
                    headers: {
                        Authorization:
                            "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",
                    },
                })
                .then((html) => {
                    if (typeof html.data === "object") {
                        setData(JSON.stringify(html.data, null, 2));
                    } else {
                        setData(html.data);
                    }

                    let scroll = Scrollbar.get(
                        document.querySelector("#root") as HTMLElement
                    );
                    if (scroll?.scrollTop !== 0)
                        scroll?.setMomentum(0, -scroll.scrollTop);
                });
        } catch (e) {
            setData("코드를 불러오는데 실패했습니다.");
            console.log(e);
        }
    }

    function showCode() {
        setShow(window.innerWidth);
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

        makeTree();
        showCode();

        window.onresize = () => {
            showCode();
        };
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

                {show >= 800 ? (
                    <div className={styles.siteTreeCode}>
                        <div>{tree}</div>
                        <textarea
                            className={styles.siteCode}
                            value={data}
                            readOnly
                        />
                    </div>
                ) : (
                    <div>
                        본 Site의 소스코드 및 트리는 더 넓은 웹뷰 환경에서만
                        제공됩니다.
                        <div>현재 width: {show}, 필요 width: 800 이상</div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Site;
