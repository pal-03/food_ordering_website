import RestaurantCard , { withPromtedLabel }from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import resList from "../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const SWIGGY_API_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING";

const getRestaurantsFromResponse = (json) => {
  const cards = json?.data?.cards ?? [];

  const restaurantsFromNewApi = cards
    .map((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    .find(Array.isArray);

  const restaurantsFromOldApi = json?.data?.cards?.[2]?.data?.data?.cards;

  return restaurantsFromNewApi ?? restaurantsFromOldApi ?? [];
};

const normalizeRestaurant = (restaurant) => {
  if (restaurant?.data) {
    return restaurant;
  }

  const info = restaurant?.info;
  if (!info) {
    return null;
  }

  const numericCostForTwo = Number(
    (info?.costForTwo || "").replace(/[^\d]/g, "")
  );

  return {
    data: {
      id: info?.id,
      name: info?.name,
      cloudinaryImageId: info?.cloudinaryImageId,
      avgRating: info?.avgRating,
      cuisines: info?.cuisines || [],
      costForTwo: Number.isFinite(numericCostForTwo) ? numericCostForTwo * 100 : 0,
      deliveryTime: info?.sla?.deliveryTime ?? 0,
    },
  };
};

const Body = () => {
  // Local State Variable - Super powerful variable
  // When we update this variable using setListOfRestraunt function, it will trigger a re-render of the component and update the UI with the new data
  // react hook is a normal JS fucntion given to us by react which allows us to use state and other react features in functional components
  // arr destructuring is used to assign the state variable and the function to update it in one line of code, making it more concise and easier to read
  // const [listOfRestaurants, setListOfRestraunt] = useState(
  //   Array.isArray(resList) ? resList : [] // set initial state to resList if it's an array, otherwise set it to an empty array
  // );
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // cannot modify listOfRestaurants directly because it's a state variable, we need to use setListOfRestraunt function to update it

  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect is a react hook that allows us to perform side effects in functional components, it takes a function as an argument and runs it after the component renders, we can also specify a dependency array as the second argument to control when the effect runs, if the dependency array is empty, the effect will run only once after the initial render

  const fetchData = async () => {
    try {
      const response = await fetch(SWIGGY_API_URL);
      if (!response.ok) {
        setListOfRestraunt(resList);
        setFilteredRestaurant(resList);
        return;
      }
      const json = await response.json();

      const parsedRestaurants = getRestaurantsFromResponse(json)
        .map(normalizeRestaurant)
        .filter(Boolean);

      const safeRestaurantList =
        parsedRestaurants.length > 0 ? parsedRestaurants : resList;

      setListOfRestraunt(safeRestaurantList);
      setFilteredRestaurant(safeRestaurantList);
    } catch {
      setListOfRestraunt(resList);
      setFilteredRestaurant(resList);
    } finally {
      setIsLoading(false);
    }
  };

  const onlineStatus = useOnlineStatus();
  // getting in the loggedIn user contxt and the setUserName function to update the logged in user information in the context, this allows us to manage the authentication state of our application and allow components to access and update the logged in user information as needed.
  const { loggedInUser, setUserName } = useContext(UserContext);

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;
      </h1>
    );

  return isLoading ? (
    <Shimmer />
  ) : (
    // UI won't change until we update the state variable using setListOfRestraunt function
    // So if we just use filter method on listOfRestaurants without using setListOfRestraunt function, UI won't change because we are not updating the state variable
    // Data and UI are in sync only when we update the state variable using setListOfRestraunt function
    // when state variables update, React triggers a reconciliation process where it compares the new virtual DOM with the previous one and updates only the parts of the real DOM that have changed, resulting in efficient updates and improved performance.
    // virtual Dom is an JS object that represents the real DOM, it allows React to efficiently update the UI by minimizing the number of changes made to the real DOM, which can be slow and expensive to manipulate directly.
    // react Fiber is the algorithm that React uses to perform this reconciliation process, allowing it to efficiently update the UI while maintaining a smooth user experience.
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            data-testid="searchInput"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              // Filter the restraunt cards and update the UI
              // searchText
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                (res?.data?.name || "")
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => Number(res?.data?.avgRating) > 4
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <label>UserName : </label>
          <input
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
          {filteredRestaurant.map((restaurant) => (
            <Link 
              key={restaurant.data.id}
              to={"/restaurants/" + restaurant.data.id}
            >
              {/* <RestaurantCard resData={restaurant} /> */}
              {restaurant.data.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
                ) : (
                  <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Body;
