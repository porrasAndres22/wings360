'use client'

import { useUser } from '@clerk/nextjs';

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'


import { loadEnvConfig } from '@next/env'
 
const projectDir = process.cwd()


export const Data = () => {

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isSignedIn) {
        return <></>
    }

    
    (async () => {
        try {
            const appUser = localStorage.getItem("appUser")
            if ((appUser == null) && (appUser != user.emailAddresses[0].emailAddress)) {
                const { fetchUser }: { fetchUser: string } = await (await fetch(`/server/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "create",
                        data: user.emailAddresses[0].emailAddress
                    })
                })).json()

                if (fetchUser == user.emailAddresses[0].emailAddress) {
                    localStorage.setItem("appUser", fetchUser)
                }
            }
        } catch (error) {
            return error
        }

    })()


    return (
        <>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <div>{user.emailAddresses[0].emailAddress}</div>
        </>
    )
}

export default Data