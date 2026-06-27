'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setIsOpen(!isOpen);
    };
    const logOutHandle = async () => {
        await authClient.signOut();
        router.push("/")
    }
    return (
        <nav className="relative w-full h-16 bg-white border-b border-slate-100 shadow-sm z-50">
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                {/* Left Side: Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="text-3xl font-bold text-slate-900 tracking-tight">
                        Shop<span className="text-blue-600">Ease</span>
                    </Link>
                </div>

                {/* Right Side: Desktop Navigation Links */}

                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-base font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
                    >
                        Home
                    </Link>
                    {
                        !session &&
                        <Link
                            href={`/login`}
                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-lg shadow-sm transition-all duration-200"
                        >
                            Login
                        </Link>
                    }
                    {
                        session &&
                        <div>
                            <Link
                                href={`/buyProduct?category=`}
                                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-lg shadow-sm transition-all duration-200"
                            >
                                My Products
                            </Link>
                            <Button onClick={logOutHandle} variant="danger-soft">Sign Out</Button>
                        </div>

                    }
                </div>
                {/* Mobile Hamburger Button */}
                <div className="flex md:hidden">
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-50 focus:outline-none"
                        aria-controls="mobile-menu"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {/* Conditional Hamburger / X Icon */}
                        {!isOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown Panel */}
            <div
                className={`absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                id="mobile-menu"
            >
                <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-center py-2 text-lg font-medium text-slate-700 hover:text-blue-600 rounded-md hover:bg-slate-50 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/buy"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-center py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}