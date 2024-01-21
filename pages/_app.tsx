import { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { scrollUp, floatingHide, setScreenSize, scrollbarInit, getScrollbar } from "./common";
import "@styles/globals.scss";

function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // 플로팅 버튼 함수 등록
        const floating = document.querySelector("#floating") as HTMLElement;
        floating.onclick = () => scrollUp();

        scrollbarInit();

        // ScrollBar 이벤트 리스너 등록
        const scroll = getScrollbar();
        scroll?.addListener(() => floatingHide(scroll!.scrollTop));
        scroll?.scrollTo(0, 0, 1);

        // viewport 크기 변화 시 floating 버튼 처리
        window.onresize = () => {
            floatingHide(scroll!.scrollTop);
            setScreenSize();
        };

        return () => {
            // ScrollBar 이벤트 리스너 해제
            scroll?.removeListener(() => floatingHide(scroll!.scrollTop));
        };
    }, []);

    useEffect(() => {
        // 모바일 브라우저의 주소창이 보일시 뷰포트 vh길이 재조정
        setScreenSize();
    });

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
                <meta name="referrer" content="no-referrer-when-downgrade" />
            </Head>

            <Header />

            <Component {...pageProps} />

            <Footer />
        </>
    );
}

export default App;
