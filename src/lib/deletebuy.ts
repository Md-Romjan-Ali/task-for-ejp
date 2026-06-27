const serverUri = process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string;
export const deleteData = async (id: string) => {
    const res = await fetch(`${serverUri}/api/buydelete/${id}`, {
        method: "DELETE",

    })
    return await res.json()
}