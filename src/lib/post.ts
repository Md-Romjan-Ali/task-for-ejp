
const serverUri = process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string;
export const buyData = async (data: object) => {
    const res = await fetch(`${serverUri}/appi/buypost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await res.json()
}