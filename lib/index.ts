
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


    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const notification = new Notification("Hi there!");
        // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("Hi there!");
                // …
            }
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.

}