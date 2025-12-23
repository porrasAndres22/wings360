"use client"
import Image from 'next/image'
import { useUser } from "@clerk/nextjs";


export default ({ dataUser }: { dataUser: string }) => {

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) return <></>

    if (!isSignedIn) return <></>

    return (

        dataUser == "name" ?
            <>{user.firstName}</> :
            dataUser == "image" ?
                <Image
                    src={user.imageUrl}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                />
                :
                <></>
    )
}

