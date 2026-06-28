const serverUri = process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string;
export const sendEmail = async (user: object) => {
    const res = await fetch(`${serverUri}/api/send-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    return await res.json()
}