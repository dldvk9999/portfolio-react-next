import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Scrollbar from "smooth-scrollbar";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"), {
    ssr: false,
});
const Footer = dynamic(() => import("../components/Footer"), {
    ssr: false,
});
const Head = dynamic(() => import("next/head"), {
    ssr: false,
});

function App({ Component, pageProps }: AppProps) {
    function scrollUp() {
        let scroll = Scrollbar.get(
            document.querySelector("#root") as HTMLElement
        );
        if (scroll?.scrollTop !== 0) scroll?.setMomentum(0, -scroll.scrollTop);
    }

    function floatingHide(scrollTop: number) {
        let floating = document.querySelector("#floating") as HTMLElement;
        if (scrollTop === 0 || window.innerHeight * 0.9 <= 460) {
            floating.classList.remove("floating-show");
        } else {
            floating.classList.add("floating-show");
        }
    }

    useEffect(() => {
        // 플로팅 버튼 함수 등록
        let floating = document.querySelector("#floating") as HTMLElement;
        floating.onclick = () => scrollUp();

        // ScrollBar 초기화
        Scrollbar.init(document.querySelector("#root") as HTMLElement);

        // ScrollBar 이벤트 리스너 등록
        let scroll = Scrollbar.get(
            document.querySelector("#root") as HTMLElement
        );
        scroll?.addListener(() => floatingHide(scroll!.scrollTop));

        // viewport 크기 변화 시 floating 버튼 처리
        window.onresize = () => floatingHide(scroll!.scrollTop);

        return () => {
            // ScrollBar 이벤트 리스너 해제
            scroll?.removeListener(() => floatingHide(scroll!.scrollTop));
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
        </>
    );
}

export default App;
