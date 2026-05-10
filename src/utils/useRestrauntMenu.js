import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchMenu();
    }, [resId]);

    const getRestaurantInfo = (data) =>
        data?.cards?.map((card) => card?.card?.card?.info).find(Boolean);

    const getRegularCards = (data) =>
        data?.cards
            ?.find((card) => card?.groupedCard?.cardGroupMap?.REGULAR)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

    const getItemCards = (data) => {
        const regularCards = getRegularCards(data);

        return regularCards.flatMap((card) => card?.card?.card?.itemCards || []);
    };

    const getCategories = (data) =>
        getRegularCards(data).filter(
            (card) =>
                card?.card?.card?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );

    const fetchMenu = async () => {
        try {
            setIsLoading(true);
            setErrorMessage("");

            const response = await fetch(MENU_API + resId);
            let json;

            if ("ok" in response && !response.ok) {
                throw new Error("Menu API did not return valid response");
            }

            if (typeof response.text === "function") {
                const raw = await response.text();

                if (!raw) {
                    throw new Error("Menu API did not return valid response");
                }

                try {
                    json = JSON.parse(raw);
                } catch {
                    throw new Error("Menu API returned non-JSON response");
                }
            } else if (typeof response.json === "function") {
                json = await response.json();
            } else {
                throw new Error("Menu API did not return valid response");
            }

            if (!json?.data) {
                throw new Error("Menu data not found");
            }

            setResInfo(json.data);
        } catch (error) {
            setResInfo(null);
            setErrorMessage(error.message || "Failed to load restaurant menu");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        errorMessage,
        restaurantInfo: getRestaurantInfo(resInfo) || {},
        itemCards: getItemCards(resInfo),
        categories: getCategories(resInfo),
    };
};

export default useRestaurantMenu;
