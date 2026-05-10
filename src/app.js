import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux"; // Provider is a component from the react-redux library that allows us to provide the Redux store to our React application, it should be used at the root of the application to ensure that all components have access to the store and can use it to manage state and dispatch actions, it takes a store prop which is set to the Redux store created using configureStore or createStore, and it wraps around the entire application in our JSX, this way all components in the application can access the store and use it to manage state and dispatch actions as needed.
import appStore from "./utils/appStore";
import Cart from "./components/Cart";

//import Grocery from "./components/Grocery";

// Chunking
// Code Splitting
// Dynamic Bundling
// lazy Loading
// on demand loading
// dynamix imoprt


// lazy() is a function from the React library that allows us to load a component lazily, meaning that the component will only be loaded when it is needed, rather than being included in the initial bundle of the application, this can help to improve the performance of the application by reducing the initial load time and allowing for faster navigation between routes, it takes a function that returns a promise which resolves to the component that we want to load lazily, and it returns a new component that can be rendered in our application, when this new component is rendered, it will trigger the loading of the original component and display it once it has been loaded successfully.

//Suspense is a component from the React library that allows us to handle the loading state of a lazily loaded component, it is used in conjunction with the lazy() function to provide a fallback UI while the lazily loaded component is being fetched and rendered, it takes a fallback prop which specifies the UI to display while the component is loading, and it wraps around the lazily loaded component in our JSX, when the lazily loaded component is being fetched, the Suspense component will display the fallback UI, and once the component has been loaded successfully, it will render the lazily loaded component in place of the fallback UI. This helps to improve the user experience by providing feedback during loading times and preventing blank screens while waiting for components to load.
const Grocery = lazy(() => import("./components/Grocery"));

const About = lazy(() => import("./components/About"));

// const CDN_URL =
//   "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";
// const FALLBACK_RESTAURANT_IMAGE =
//   "https://placehold.co/508x320/f0f0f0/666666?text=Image+Unavailable";

// const Body = () => {
//   return (
//     // Building a cart with restaurant cards and serach bar
//     <div className="body">
//       <div className="search">Search</div>
//       <div className="res-container">
//         {resList.map((restaurant) => (
//           <RestaurantCard key={restaurant.data.id} resData={restaurant} />
//           // restaurant.data is passed as props to RestaurantCard component
//           // wraps all props into one object and sent
//           // key is used to uniquely identify each restaurant card and avoid re-rendering of all cards when one card is updated
//           // do not use index as key because it can lead to bugs when the order of items changes
//         ))}
//       </div>
//     </div>
//   );
// };

const AppLayout = () => {
  const [userName, setUserName] = useState();

  //authentication
  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: "Swayam",
    };
    setUserName(data.name);
  }, []);

  return (
    // <div className="app">
    //   <Header />
    //   {/* if path is / we should have Body component
    //     if path is /about we should have About component
    //     if path is /contact we should have Contact component
    //    */}
    //   {/* <Body /> */}
    //   <Outlet />
    //   {/* So this outlet will be filled with children according to the path
    //       if path is / we should have Body component
    //       if path is /about we should have About component
    //       if path is /contact we should have Contact component
    //    */}
    // </div>

    // We are wrapping our entire application with the UserContext.Provider component, which allows us to provide the loggedInUser and setUserName values to all components in our application that consume the UserContext, this way we can easily manage the authentication state of our application and allow components to access and update the logged in user information as needed.

    // If u don't provide value to the provider then the default value provided in the createContext will be used, which is undefined in our case, so it is important to provide a value to the provider to ensure that the context consumers have access to the correct data and can function properly.
    // setUser is passed to update the username in the context, it can be used in any component that consumes the UserContext to update the logged in user information, this allows for a centralized way to manage and update the authentication state of the application, making it easier to maintain and debug.
    <Provider store={appStore}>
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
    </Provider>
  );
};

// createBrowserRouter is used to create a router object that can be used to define the routes for our application, it takes an array of route objects as an argument, each route object defines a path and the component that should be rendered when that path is accessed, it also allows us to define nested routes and error handling for our application
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // Outlet is a component that is used to render the child routes of a parent route, it acts as a placeholder for the child routes and allows us to define nested routes in our application, when a child route is accessed, the corresponding component will be rendered inside the Outlet component of the parent route
    children: [
      {
        index: true,
        element: <Body />,
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: <Contact />,
      },
      // :resId is a dynamic parameter that can be accessed in the RestaurantMenu component using the useParams hook, it allows us to render the menu of a specific restaurant based on the restaurant id passed in the URL
      {
        path: "restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<AppLayout />);
// RouterProvider is a component that provides the router object to the rest of the application, it should be used at the root of the application to ensure that all components have access to the router object and can use it to navigate between routes and access route parameters
root.render(<RouterProvider router={appRouter} />);
