import Link from "next/link";

const Header = () => {
    return (
        <header>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/about">
                <a>About</a>
            </Link>
            <Link href="/activity">
                <a>Activity</a>
            </Link>
            <Link href="/project">
                <a>Project</a>
            </Link>
        </header>
    );
};

export default Header;
