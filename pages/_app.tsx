import Scrollbar from "smooth-scrollbar";
import { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import Header from "@components/Header";
import Footer from "@components/Footer";
import "@styles/globals.scss";

function App({ Component, pageProps }: AppProps) {
    // 스크롤 업 버튼 - 플로팅 버튼 클릭 시 실행 함수
    function scrollUp() {
        const scroll = Scrollbar.get(document.querySelector("#root") as HTMLElement);
        if (scroll?.scrollTop !== 0) scroll?.setMomentum(0, -scroll.scrollTop);
    }

    // 최상단에 스크롤 시 플로팅 버튼 사라짐
    function floatingHide(scrollTop: number) {
        const floating = document.querySelector("#floating") as HTMLElement;
        if (scrollTop === 0 || window.innerHeight * 0.9 <= 460) {
            floating.classList.remove("floating-show");
        } else {
            floating.classList.add("floating-show");
        }
    }

    // --vh 변수 값을 만들어서 모바일 브라우저 접속 시 주소창에 의한 viewport 길이 변경을 감지하고 동적 변환
    function setScreenSize() {
        const scroll = Scrollbar.get(document.querySelector("#root") as HTMLElement);
        const vh = window.innerHeight;
        if (scroll!.size.content.height < vh + scroll!.scrollTop) {
            scroll?.setMomentum(0, scroll!.size.content.height - vh);
        }
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    useEffect(() => {
        // 플로팅 버튼 함수 등록
        const floating = document.querySelector("#floating") as HTMLElement;
        floating.onclick = () => scrollUp();

        // ScrollBar 초기화
        Scrollbar.init(document.querySelector("#root") as HTMLElement);

        // ScrollBar 이벤트 리스너 등록
        const scroll = Scrollbar.get(document.querySelector("#root") as HTMLElement);
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
