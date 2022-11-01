import "../styles/globals.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import type { AppProps } from "next/app";
import Scrollbar from "smooth-scrollbar";
import { useEffect } from "react";

function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        Scrollbar.init(document.querySelector("#root") as HTMLElement);
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
