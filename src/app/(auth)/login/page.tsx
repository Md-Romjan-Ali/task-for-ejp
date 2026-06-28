"use client"

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState('')
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { data, error } = await authClient.signIn.email({
            email, // required
            password, // required
            rememberMe: true,

        });

        setErrors(error?.message as string)
        console.log(data, error);
        setLoading(false)
        if (data) {
            router.push('/')
        }
    }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
                <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:shadow-indigo-500/20">

                    <h1 className="mb-2 text-center text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                        WelCome Beck
                    </h1>
                    <p className="text-sm text-center text-slate-500 mb-6">
                        Join us today! Please enter your details.
                    </p>

                    {errors && (
                        <div className="mb-5 text-sm font-medium text-pink-600 bg-pink-50 border border-pink-200 p-3 rounded-lg text-center animate-shake">
                            {errors}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 placeholder:text-slate-400 text-slate-800"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 placeholder:text-slate-400 text-slate-800"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-violet-700 hover:to-indigo-700 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Login in...
                                </span>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                    <h1 className="text-gray-700 mt-3 gap-1 flex items-center  text-lg">If You alread have an Acount <Link href={'/register'} className="text-blue-500 hover:underline">Register</Link></h1>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;