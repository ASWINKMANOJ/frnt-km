import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="h-full w-full flex items-center justify-between md:px-12 px-4">
            <h1 className="text-2xl font-bold">Red Box</h1>
            <div className="hidden md:visible h-full w-1/3 rounded-full md:flex items-center justify-between px-8 bg-white shadow-2xl">
                <a href="#">Home</a>
                <a href="#">Features</a>
                <a href="#">About us</a>
            </div>
            <Link href="/auth/login">
                <Button>Get Started</Button>
            </Link>
        </div>
    );
}
