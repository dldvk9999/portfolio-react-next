/** @type {import('next').NextConfig} */
import { join } from "path";

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [join(__dirname, "styles")],
        prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
    },
};

export default nextConfig;
