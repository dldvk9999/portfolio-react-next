/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
import nextPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    reactStrictMode: false,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `https://raw.githubusercontent.com/dldvk9999/portfolio-react-next/main/:path*`,
            },
        ];
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
    },
    // async headers() {
    //     return [
    //         {
    //             // matching all API routes
    //             source: "/:path*",
    //             headers: [
    //                 { key: "Access-Control-Allow-Credentials", value: "true" },
    //                 { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
    //                 { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
    //                 {
    //                     key: "Access-Control-Allow-Headers",
    //                     value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    //                 },
    //             ],
    //             basePath: false,
    //         },
    //     ];
    // },
};

const nextConfig = nextPWA({
    dest: "public",
    // disable: !isProduction,
    runtimeCaching: runtimeCaching,
})(config);

export default nextConfig;
