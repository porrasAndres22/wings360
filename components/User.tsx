'use client'

import { useUser } from '@clerk/nextjs';




export const Data = () => {

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isSignedIn) {
        return <></>
    }

    (async () => {

        const data: any = await (await fetch(`http://localhost:5000/asyncuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: user.emailAddresses[0].emailAddress })
        })).json()

        // console.log(data.hola)

        return data.hola
    })()


    return (
        <>
            {/* <div>{user.emailAddresses[0].emailAddress}</div> */}
        </>
    )
}

export default Data