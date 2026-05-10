import { CDN_URL, FALLBACK_RESTAURANT_IMAGE } from "../utils/constants";
import UserContext from "../utils/UserContext";
import { useContext } from "react";

const RestaurantCard = (props) => {
    const { resData } = props;
    // destructuring the data from the restaurant data object to use in the restaurant card component
    const { loggedInUser } = useContext(UserContext);
    const restaurantInfo = resData?.data ?? resData ?? {};
  
    const {
      cloudinaryImageId,
      name,
      avgRating,
      cuisines = [],
      costForTwo,
      deliveryTime,
      sla,
    } = restaurantInfo;
    // using optional chaining to avoid errors in case the data is not available
    const deliveryTimeInMinutes = deliveryTime ?? sla?.deliveryTime;
    const costForTwoLabel =
      typeof costForTwo === "number" ? `₹${costForTwo / 100} FOR TWO` : costForTwo;
  
    return (
      // Using inline CSS to override the default styles of the restaurant card
      // using an object to define the styles for the restaurant card
      <div
      data-testid="resCard"
      className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200"
    >
        <img
          className="rounded-lg"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = FALLBACK_RESTAURANT_IMAGE;
          }}
        />
        <h3 className="font-bold py-4 text-lg">{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwoLabel}</h4>
        <h4>{deliveryTimeInMinutes} minutes</h4>
        <h4>User : {loggedInUser} </h4>
      </div>
    );
  };


// Higher Order Component

// input - RestaurantCard =>> RestaurantCardPromoted

// here withPromotedLabel is a higher order component/function that takes a component as an argument and returns a new component that renders the original component with a promoted label on top of it. This allows us to reuse the same restaurant card component for both promoted and non-promoted restaurants, while adding the promoted label only to the promoted restaurants.

// These are pure functions that do not have any side effects and return the same output for the same input. They are used to add additional functionality to a component without modifying the original component. This is a common pattern in React for code reuse and separation of concerns.
export const withPromtedLabel = (RestaurantCard) => {
  // return another component/function that takes the same props as the original component and renders the original component with a promoted label on top of it
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
