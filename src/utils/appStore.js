import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// configureStore is a function provided by Redux Toolkit that simplifies the process of creating a Redux store. It takes an object as an argument, where you can specify the reducers for your application. In this case, we are passing an object with a single property 'cart', which is set to the cartReducer imported from the cartSlice file. The configureStore function will automatically set up the store with the provided reducer and also include some default middleware for handling asynchronous actions and other common tasks in Redux applications. The resulting store is then exported for use in the rest of the application.
const appStore = configureStore({
    // addign slice reducer to the store, this will allow us to manage the state of the cart in our application, and we can dispatch actions to update the cart state as needed based on user interactions in our components. The cartReducer will handle the actions dispatched from our components and update the cart state accordingly, allowing us to add items to the cart, remove items from the cart, and clear the cart as needed based on user interactions in our components.
    // big reducer object that combines all the reducers from different slices in our application, this allows us to manage the state of different features or domains of our application in a modular way, and it also allows us to easily add new features or domains by simply creating new slices and adding their reducers to the store.
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;