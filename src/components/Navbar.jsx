"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../assets/logo.png";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
    const [theme, setTheme] = useState("light");
    const { data: session } = useSession();
    const pathname = usePathname();

    // Dark / Light theme toggle
    useEffect(() => {
        document.querySelector("html")?.setAttribute("data-theme", theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/availableCars", label: "Available Cars" },
        { href: "/addCar", label: "Add Car", private: true }, // Protected page
    ];

    return (
        <div className="px-4 lg:px-10 navbar bg-base-100 border-b border-base-300 shadow-sm fixed top-0 left-0 right-0 z-50">
            {/* Navbar start */}
            <div className="navbar-start">
                {/* Dropdown for mobile */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn bg-base-300 btn-sm lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 z-1 mt-3 w-52 p-2 shadow"
                    >
                        {navItems.map((item) =>
                            item.private && !session ? null : (
                                <li key={item.href}>
                                    <Link href={item.href} className={pathname === item.href ? "text-primary" : ""}>
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        )}

                        {/* Sign In / Sign Out button */}
                        <li>
                            {!session ? (
                                <button onClick={() => signIn()} className="hover:text-primary text-left">
                                    SignIn
                                </button>
                            ) : (
                                <button onClick={() => signOut()} className="hover:text-primary text-left">
                                    SignOut
                                </button>
                            )}
                        </li>
                    </ul>
                </div>

                {/* Logo */}
                <Link href="/" className="cursor-pointer ml-2 lg:ml-0 flex items-center gap-1 size-20">
                    <img src={logo.src} alt="logo.png" />
                </Link>
            </div>

            {/* Navbar center links (desktop) */}
            <div className="navbar-center hidden lg:flex xl:text-xl">
                <ul className="flex gap-5 px-1">
                    {navItems.map((item) =>
                        item.private && !session ? null : (
                            <li key={item.href}>
                                <Link href={item.href} className={pathname === item.href ? "text-primary" : ""}>
                                    {item.label}
                                </Link>
                            </li>
                        )
                    )}
                    <li>
                        {!session ? (
                            <button onClick={() => signIn()} className="hover:text-primary text-left">
                                SignIn
                            </button>
                        ) : (
                            <button onClick={() => signOut()} className="hover:text-primary text-left">
                                SignOut
                            </button>
                        )}
                    </li>
                </ul>
            </div>

            {/* Navbar end */}
            <div className="navbar-end gap-5 xl:text-xl">
                {/* Theme toggle */}
                <button className="btn btn-ghost btn-circle" onClick={handleThemeToggle}>
                    {theme === "light" ? "🌙" : "☀️"}
                </button>

                {/* User avatar */}
                {session && session.user && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="User Avatar" src={session.user.image || "https://i.pravatar.cc/100"} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
