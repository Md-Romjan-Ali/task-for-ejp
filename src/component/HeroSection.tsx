'use client';

import { authClient } from "@/lib/auth-client";
import { sendEmail } from "@/lib/nodemailer";
import { buyData } from "@/lib/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function HeroExpense() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget
        if (!session) {
            router.push('/login')
            return;
        }
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const datas = Object.fromEntries(formData.entries())
        const data = {
            ...datas,
            userId: session?.user?.id
        }
        console.log(data);
        const buyDatas = await buyData(data)


        console.log(buyDatas, 'from hero section first data second email');
        toast.success('Thanks for buy this Product')
        setLoading(false)

        form.reset()
        await sendEmail(session?.user)
    };

    return (
        <section className="relative min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center py-12 md:py-20 lg:py-24">
            {/* Background Decorative Gradient/Blur Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                {/* Left Column: Visual Heading & Content */}
                <div className="lg:col-span-6 max-w-2xl lg:max-w-none text-center lg:text-left">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-6">
                        Take control of your money
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Track your expenses <span className="text-blue-600 block sm:inline">effortlessly</span> in real time.
                    </h1>
                    <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Stop wondering where your money went. Log daily purchases instantly, categorize your budget, and visualize your financial habits.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            <span>Secure local processing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            <span>Instant visual breakdown</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Dynamic Form Container */}
                <div className="lg:col-span-6 w-full max-w-md mx-auto lg:max-w-md">
                    <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Add New Expense</h2>
                            <p className="text-sm text-slate-500 mt-1">Fill out the transaction specifics below.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Title Field */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Expense Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="e.g., Grocery shopping, Netflix"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            {/* Grid Wrapper for Amount & Category */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Amount Field */}
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Amount ($)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
                                        <input
                                            type="number"
                                            name="amount"
                                            required
                                            min="0.01"
                                            step="0.01"
                                            placeholder="0.00"
                                            className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Category Dropdown */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        required
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Choose category</option>
                                        <option value="tshirt">
                                            T-Shirt
                                        </option>
                                        <option value="shoes">
                                            Shoes
                                        </option>
                                        <option value="utilities">Utilities </option>
                                        <option value="rent">Rent / Housing </option>
                                        <option value="transport">Transport </option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Date Picker Field */}
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Transaction Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm cursor-pointer"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all duration-150"
                            >
                                {
                                    loading ? 'Confrming...' : 'Confirm'
                                }

                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}