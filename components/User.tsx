'use client'

import { useAuth, useUser } from '@clerk/nextjs';

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'




export default () => {


    const { isLoaded, isSignedIn, user } = useUser();

    const { has }: any = useAuth()

    if (!isLoaded) return <>Loading...</>

    if (!isSignedIn) return <></>

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

    const canManage: boolean = has({ permission: 'org:testpermission:soyadmin' })

    if (!canManage) return <h1>You do not have the permissions to manage team settings.</h1>

    return (
        <>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton showName />
            </SignedIn>
        </>
    )
}