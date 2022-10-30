import { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument() {
    return (
        <Html lang="ko">
            <Head />
            <body>
                <div id="root">
                    <Main />
                    <NextScript />
                </div>
            </body>
        </Html>
    );
}
