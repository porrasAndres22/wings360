import { useUser } from "@clerk/nextjs";


export const userClerkHandler = async (user: any) => {
    try {
        const appUser = localStorage.getItem("appUser")
        if ((user != null) && (appUser == null) && (appUser != user.emailAddresses[0].emailAddress)) {
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

}