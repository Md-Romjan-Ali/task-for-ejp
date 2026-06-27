"use client";

import { updateData } from "@/lib/update";
import { Button, Modal, Surface, } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface updateForId {
    id: string
}
export function UpdateModal({ id }: updateForId) {
    const router = useRouter()
    const updateHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const update = await updateData(id, data)
        router.refresh()
        toast.success('Update Succefull')
        console.log(update, 'from udpate modal');
    }
    return (
        <Modal>
            <Button variant="secondary">Update</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={updateHandle} className="space-y-5">
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

                                        Save
                                    </button>
                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}