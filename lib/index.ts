
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

export const useServiceWorker = (route: string) => {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register(route)
    }
}

export const useWindowCaches = () => {
    if (window.caches) {
        caches.open('cache-v1.1').then(caches => {
            caches.add('/jellyfish.html')
            caches.add('/')

            caches.match('/jellyfish.html').then(res => { res?.text().then() })
        })
    }
}

export const useNotification = () => {
    if (window.Notification) {
        if (Notification.permission === 'granted') {
            new Notification('Wings360 Notification')
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(( permission ) => {
                if (permission === 'granted') {
                    new Notification('Wings Granted')
                }
            })
        }
    }
}