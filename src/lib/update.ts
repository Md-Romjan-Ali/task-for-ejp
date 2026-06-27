const serverUri = process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string;
export const updateData = async (id: string, data: object) => {
    const res = await fetch(`${serverUri}/api/updatebuy/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await res.json()
}