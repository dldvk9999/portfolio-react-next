import "../styles/globals.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />

            <Component {...pageProps} />

            <Footer />
        </>
    );
}

export default App;
