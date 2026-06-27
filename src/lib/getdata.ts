const serverUri = process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string;

export const getBuyData = async (userId: string, category: string) => {
    const res = await fetch(`${serverUri}/api/getbuydata?userId=${userId}&category=${category}`)
    return await res.json()
}