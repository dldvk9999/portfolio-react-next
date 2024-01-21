/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Scrollbar from "smooth-scrollbar";
import styles from "@styles/Home.module.scss";
import { getKey } from "@api/api";
import scrollUp, { hideTitle } from "pages/common";

const componentsCode = ["Header", "Footer", "Modal"];
const pagesCode = ["about", "activity", "project", "site"];

const Site = () => {
    const [data, setData] = useState<string>("");
    const [tree, setTree] = useState<JSX.Element[]>();
    const [show, setShow] = useState<number>(0);
    const [key, setKey] = useState<string>("");
    const [commits, setCommit] = useState<Array<any>>([]);
    const [commitLength, setCommitLength] = useState<number>(0);

    // next.config.js에서 주소 프록시
    const rawURL = "/api";

    // components 부분 만들기 - 중복 코드 줄임
    function makeComponent(type: string) {
        const result = [];
        const file = type === "ts" ? ".tsx" : ".scss";
        const path = type === "ts" ? "" : "/styles";
        for (const code of componentsCode) {
            result.push(
                <li onClick={() => rawHTML(path + "/components/" + code + file)} key={"components-" + code}>
                    {code + file}
                </li>
            );
        }
        return result;
    }

    // pages 부분 만들기 - 중복 코드 줄임
    function makePages() {
        const result = [];
        for (const code of pagesCode) {
            result.push(
                <li key={"pages-tsx-" + code}>
                    {code}
                    <ul>
                        <li onClick={() => rawHTML("/pages/" + code + "/index.tsx")}>index.tsx</li>
                    </ul>
                </li>
            );
        }
        return result;
    }

    // pages 부분 만들기 - SCSS - 중복 코드 줄임
    function makePagesSCSS() {
        const result = [];
        for (const code of pagesCode) {
            const file = code.charAt(0).toUpperCase() + code.slice(1);
            result.push(
                <li onClick={() => rawHTML("/styles/pages/" + file + ".scss")} key={"pages-scss-" + code}>
                    {file + ".scss"}
                </li>
            );
        }
        return result;
    }

    // 코드가 상당히 길고 난잡해 보이나 Github API의 불필요한 API 요청을 줄임 (token 존재 시 시간당 최대 15000회 가능)
    function makeTree() {
        const result = [];
        result.push(
            <div className={styles.siteTreeList} key={"site-tree"}>
                root
                <ul>
                    <li>
                        components
                        <ul>{makeComponent("ts")}</ul>
                    </li>
                    <li>
                        pages
                        <ul>
                            {makePages()}
                            <li onClick={() => rawHTML("/pages/_app.tsx")}>_app.tsx</li>
                            <li onClick={() => rawHTML("/pages/_document.tsx")}>_document.tsx</li>
                            <li onClick={() => rawHTML("/pages/index.tsx")}>index.tsx</li>
                        </ul>
                    </li>
                    <li onClick={() => setData("이 파일은 공개하지 않습니다.")}>public</li>
                    <li>
                        styles
                        <ul>
                            <li>
                                components
                                <ul>{makeComponent("scss")}</ul>
                            </li>
                            <li>
                                pages
                                <ul>{makePagesSCSS()}</ul>
                            </li>
                            <li onClick={() => rawHTML("/styles/_variables.scss")}>_variables.scss</li>
                            <li onClick={() => rawHTML("/styles/globals.scss")}>globals.scss</li>
                            <li onClick={() => rawHTML("/styles/Home.module.scss")}>Home.module.scss</li>
                        </ul>
                    </li>
                    <li onClick={() => rawHTML("/.eslintrc.json")}>.eslintrc.json</li>
                    <li onClick={() => rawHTML("/.gitignore")}>.gitignore</li>
                    <li onClick={() => rawHTML("/next.config.js")}>next.config.js</li>
                    <li onClick={() => rawHTML("/package.json")}>package.json</li>
                    <li onClick={() => rawHTML("/README.md")}>README.md</li>
                    <li onClick={() => rawHTML("/tsconfig.json")}>tsconfig.json</li>
                </ul>
            </div>
        );
        setTree(result);
    }

    async function getAPIKey() {
        const key = await getKey("site");
        setKey(key);
    }

    // Github REST API를 이용해 Github내의 소스코드를 raw data로 불러옴
    async function rawHTML(path: string) {
        try {
            await axios
                .get(rawURL + path, {
                    headers: {
                        Authorization: key,
                    },
                })
                .then((html) => {
                    if (typeof html.data === "object") {
                        setData(JSON.stringify(html.data, null, 2));
                    } else {
                        setData(html.data);
                    }

                    const scroll = Scrollbar.get(document.querySelector("#root") as HTMLElement);
                    if (scroll?.scrollTop !== 0) scroll?.setMomentum(0, -scroll.scrollTop);
                });
        } catch (e) {
            setData("코드를 불러오는데 실패했습니다.");
            console.log(e);
        }
    }

    // 커밋 로그 가져오기
    async function getCommits() {
        try {
            await axios.get("https://api.github.com/repos/dldvk9999/portfolio-react-next/commits").then((html) => {
                setCommit(html.data.slice(0, 5));
                setCommitLength(html.data.length);
            });
        } catch (e) {
            console.log(e);
        }
    }

    // 커밋 로그 출력
    function printCommits() {
        const result = [];
        for (let i = 0; i < commits.length; i += 1) {
            result.push(
                <tr key={commits[i].sha}>
                    <td>{commitLength - i}</td>
                    <td>
                        <b>{commits[i].commit.message}</b>
                    </td>
                    <td>{new Date(commits[i].commit.committer.date).toLocaleString()}</td>
                </tr>
            );
        }

        return result;
    }

    function showCode() {
        setShow(window.innerWidth);
    }

    useEffect(() => {
        // 스크롤 상단 위치
        scrollUp();
        // 타이틀 숨김
        hideTitle();
        // tree 출력
        makeTree();
        //code 란 출력
        showCode();
        // API Key get
        getAPIKey();
        // commit 출력
        getCommits();

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
                    rel="noopener noreferrer nofollow"
                >
                    Github로 이동
                </a>

                <table className={styles.commit}>
                    <thead>
                        <tr>
                            <th>커밋 번호</th>
                            <th>커밋 메시지</th>
                            <th>커밋 시간</th>
                        </tr>
                    </thead>
                    <tbody>{printCommits()}</tbody>
                </table>

                {show >= 800 ? (
                    <div className={styles.siteTreeCode}>
                        <div>{tree}</div>
                        <textarea className={styles.siteCode} value={data} readOnly />
                    </div>
                ) : (
                    <div>
                        본 Site의 소스코드 및 트리는 더 넓은 웹뷰 환경에서만 제공됩니다.
                        <div>현재 width: {show}, 필요 width: 800 이상</div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Site;
