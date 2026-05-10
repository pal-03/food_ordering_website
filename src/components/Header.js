import { LOGO_URL } from "../utils/constants";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux"; // useSelector is a hook provided by the react-redux library that allows us to access the state of the Redux store in our React components. It takes a selector function as an argument, which is a function that receives the entire state of the store and returns a specific piece of data from it. In this case, we are using useSelector to access the items in the cart from the cart slice of our Redux store. By calling useSelector with a selector function that retrieves the cart items, we can get the current state of the cart and display it in our Header component, such as showing the number of items in the cart or rendering a list of items in the cart dropdown. This allows us to keep our UI in sync with the state of our application managed by Redux.

const Header = () => {
    const [btnNameReact, setBtnNameReact] = useState("Login");
    console.log("Header rendered");
    const onlineStatus = useOnlineStatus();
    const { loggedInUser } = useContext(UserContext);
    console.log(loggedInUser);
    //console.log(loggedInUser);

  // Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems); 
    // useState re-renders the component when the state variable is updated, so when we click the login button, it will update the btnNameReact state variable and trigger a re-render of the Header component, which will update the button text to "Logout" or "Login" accordingly

    // But how can we update a const variable? So render means we are creating a new instance of the Header component, and when we create a new instance of the Header component, we are creating a new instance of the btnNameReact variable, so we can update the btnNameReact variable in the new instance of the Header component without any issues

    useEffect(() => {
      console.log("useEffect in Header");

      return () => {
        // this return is used for unmount tasks like clean up and all
        console.log("useEffect cleanup in Header");
      }
    }, []);
    /*USE EFFECT CONCEPT */
    // If we do not put any dependency array, useEffect will run after every render, which can lead to infinite loops if we are updating state variables inside the useEffect, so we need to provide an empty dependency array to run the useEffect only once after the initial render
    
    // If we put something in the dependency array then it will run the useEffect every time that variable changes, so if we put btnNameReact in the dependency array, it will run the useEffect every time the btnNameReact variable changes, which can lead to infinite loops if we are updating the btnNameReact variable inside the useEffect, so we need to be careful while using useEffect and providing the dependency array

    // Why can't we have the callback function of useEffect async ?
    // The callback function of useEffect cannot be async because useEffect expects a cleanup function to be returned, and async functions return a promise, which is not a valid cleanup function. If we try to make the callback function async, it will cause an error because useEffect will not be able to handle the promise returned by the async function as a cleanup function. Instead, we can define an async function inside the useEffect callback and call it immediately to perform asynchronous operations without making the entire callback function async.

    return (
      // BEM naming convention
      // what are we doing here? creating a header for our app
      // use className instead of class because class is a reserved keyword in JS
      <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">     
        <div className="logo-container">
          <img
            className="w-56"
            src={LOGO_URL}
          />
        </div>
        <div className="flex items-center">
          <ul className="flex p-4 m-4">
            <li className="px-4">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
            <li className="px-4">
              {/* We should not use an anchor tag here 
              because it will cause a full page reload and we want to avoid that in a single page application, so we should use Link component from react-router-dom which will allow us to navigate to different routes without causing a full page reload, it will update the URL and render the corresponding component without refreshing the page

              Link component is used to create links in our application, it takes a to prop which specifies the path to navigate to when the link is clicked, and it renders an anchor tag with the href attribute set to the value of the to prop, but it also prevents the default behavior of the anchor tag which is to cause a full page reload, and instead it uses the history API to update the URL and render the corresponding component without refreshing the page
               */}
              <Link to="/">Home</Link>
            </li>
            <li className="px-4">
              <Link to="/about">About Us</Link>
            </li>
            <li className="px-4">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="px-4">
              <Link to="/grocery">Grocery</Link>
            </li>
            <li className="px-4 font-bold text-xl">
              <Link to="/cart">Cart - ({cartItems.length} items)</Link>
            </li>
            <button
              className="login"
              onClick={() => {
                btnNameReact === "Login"
                  ? setBtnNameReact("Logout")
                  : setBtnNameReact("Login");
              }}
            >
            {btnNameReact}
          </button>
          <li className="px-4 ">{loggedInUser}</li>
          </ul>
        </div>
      </div>
    );
  };

export default Header;
