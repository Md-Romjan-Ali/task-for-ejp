
import PieWithGradient from "@/component/Chart";
import DeleteAndUpdateForBuy from "@/component/DeleteAndUpdateForBuy";
import { SearchSection } from "@/component/SearchSection";
import { auth } from "@/lib/auth";
import { getBuyData } from "@/lib/getdata";
import { headers } from "next/headers";

interface props {
    searchParams: {
        category?: string
    }

}
export default async function ExpenseTable({ searchParams }: props) {
    const params = await searchParams
    console.log(params, 'from buy all');

    interface GetData {
        _id: string
        title: string,
        amount: string,
        category: string,
        date: string

    }
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userId = session?.user?.id
    if (!userId) {
        return;
    }
    const getdata = await getBuyData(userId, params.category as string)
    console.log(getdata, 'from bu page');
    return (
        <div className="bg-gray-300 min-h-screen">
            <div className="md:flex gap-2 mt-10 mb-4 max-w-4xl items-center md:h-40 mx-auto">
                <PieWithGradient getdata={getdata} />
                <SearchSection />
            </div>
            <div className="overflow-x-auto max-w-4xl mx-auto m-6 rounded-lg border border-gray-200 shadow-md">

                {
                    getdata.length === 0 ? <div className=" flex items-center justify-center">
                        <h1 className="text-gray-700">No Data Found</h1>

                    </div>
                        :
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                                <tr className="text-lg">
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Title</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Category</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Amount</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Date</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900 flex text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {getdata.map((item: GetData, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        {/* Title */}
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>

                                        {/* Category */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600 capitalize">
                                                {item.category}
                                            </span>
                                        </td>

                                        {/* Amount */}
                                        <td className="px-6 py-4 font-medium text-gray-700">${item.amount}</td>

                                        {/* Date */}
                                        <td className="px-6 py-4">{item.date}</td>

                                        {/* Action Buttons */}
                                        <td className="">
                                            <DeleteAndUpdateForBuy id={item?._id} ></DeleteAndUpdateForBuy>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                }

            </div>
        </div>
    );
}