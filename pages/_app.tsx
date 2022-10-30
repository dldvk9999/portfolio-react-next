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
            </Head>

            <Header />

            <Component {...pageProps} />

            <Footer />
        </>
    );
}

export default App;
