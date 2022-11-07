import "../styles/globals.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import type { AppProps } from "next/app";
import Scrollbar from "smooth-scrollbar";
import { useEffect } from "react";

function App({ Component, pageProps }: AppProps) {
    function scrollUp() {
        let scroll = Scrollbar.get(
            document.querySelector("#root") as HTMLElement
        );
        if (scroll?.scrollTop !== 0) scroll?.setMomentum(0, -scroll.scrollTop);
    }

    function floatingMove(scrollTop: number) {
        let floating = document.querySelector("#floating") as HTMLElement;
        floating.style.top = scrollTop + window.innerHeight * 0.9 + "px";

        if (scrollTop === 0 || window.innerHeight * 0.9 <= 460) {
            floating.classList.remove("floating-show");
        } else {
            floating.classList.add("floating-show");
        }
    }

    useEffect(() => {
        // 플로팅 버튼 위치 초기화
        floatingMove(0);

        // ScrollBar 초기화
        Scrollbar.init(document.querySelector("#root") as HTMLElement);

        // ScrollBar 이벤트 리스너 등록
        let scroll = Scrollbar.get(
            document.querySelector("#root") as HTMLElement
        );
        scroll?.addListener(() => floatingMove(scroll!.scrollTop));

        // window resize 이벤트 감지 시 플로팅 버튼 위치 재변경
        window.onresize = () => {
            floatingMove(scroll!.scrollTop);
        };

        return () => {
            // ScrollBar 이벤트 리스너 해제
            scroll?.removeListener(() => floatingMove(scroll!.scrollTop));
        };
    }, []);

    return (
        <>
            <Head>
                <title>Portfolio - JongGeun</title>
                <meta
                    name="description"
                    content="This page is JongGeun's portfolio made with Next.js, so please be careful as it contains personal and other sensitive information."
                ></meta>
                <meta
                    name="keywords"
                    content="portfolio,frontend,frontend,frontend,nextjs,activity,project,site,react"
                />
            </Head>

            <Header />

            <Component {...pageProps} />

            <Footer />

            <button id="floating" onClick={scrollUp}>
                &uarr;
            </button>
        </>
    );
}

export default App;
