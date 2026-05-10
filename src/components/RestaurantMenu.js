import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestrauntMenu";
import { useState } from "react";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const dummy = "Dummy Data";
    // useParams is a hook provided by react-router-dom that allows us to access the dynamic parameters defined in the route, in this case, we can access the resId parameter from the URL, which represents the restaurant id, and use it to fetch the menu data for that specific restaurant
    const { isLoading, errorMessage, restaurantInfo, itemCards, categories } =
        useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(null);

    if (isLoading) return <Shimmer />;
    if (errorMessage) {
        return (
            <div className="menu">
                <h2>Unable to load menu</h2>
                <p>{errorMessage}</p>
            </div>
        );
    }

    const name = restaurantInfo?.name || "Restaurant";
    const cuisines = restaurantInfo?.cuisines || [];
    const costForTwoMessage = restaurantInfo?.costForTwoMessage || "";


    // Using lifting component state up to manage the show/hide state of the items in the categories, we can pass the showIndex and setShowIndex as props to the RestaurantCategory component, and when a category is clicked, we can update the showIndex state to the index of the clicked category, which will trigger a re-render and show the items for that category
    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(", ")} {costForTwoMessage ? `- ${costForTwoMessage}` : ""}
            </p>
            {/* categories accordions */}
            {categories.map((category, index) => (
                // controlled component
                // passing the data as props
                <RestaurantCategory
                    key={`${category?.card?.card?.title || "category"}-${index}`}
                    data={category?.card?.card}
                    showItems={index === showIndex ? true : false}
                    setShowIndex={() =>
                        setShowIndex((prevIndex) =>
                            prevIndex === index ? null : index
                        )
                    }
                    dummy={dummy}
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;
