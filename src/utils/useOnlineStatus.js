import { useEffect, useState } from "react";

const useOnlineStatus = () => {
    const [onlineStatus, setOnlineStatus] = useState(true);

    useEffect(() => {
        // we can use the navigator.onLine property to check the online status of the user, it returns a boolean value indicating whether the browser is online or offline, so we can set the initial state of onlineStatus to navigator.onLine to get the current online status of the user when the component mounts
        // setOnlineStatus(navigator.onLine);
        // Or use the window addEventListener to listen for the online and offline events to update the onlineStatus state variable accordingly, so when the user goes offline, we can set the onlineStatus to false, and when the user comes back online, we can set the onlineStatus to true
        window.addEventListener("offline", () => {
            setOnlineStatus(false);
        });

        window.addEventListener("online", () => {
            setOnlineStatus(true);
        });
    }, []);

    // boolean value
    return onlineStatus;
};

export default useOnlineStatus;