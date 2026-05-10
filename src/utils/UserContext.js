import { createContext } from "react";

// createContext is a function provided by React that allows us to create a context object, which can be used to share data across components without having to pass props down manually at every level of the component tree, in this case, we are creating a UserContext that will hold the information about the logged-in user, and we can use this context to provide the logged-in user information to any component that needs it, without having to pass it down through props from a parent component.
const UserContext = createContext({
  loggedInUser: "Default User",
});

export default UserContext;