import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("Should render Header Component with a login button", () => {
  // we have to use Provider component from react-redux to wrap our Header component in the test case because the Header component is using the useSelector hook to access the state of the Redux store, and in order for the useSelector hook to work properly in our test environment, we need to provide a Redux store using the Provider component. By wrapping our Header component with the Provider and passing our appStore as a prop, we can ensure that the useSelector hook can access the state of the Redux store and allow us to test the functionality of our Header component that relies on the Redux state, such as displaying the number of items in the cart or rendering a list of items in the cart dropdown.

  // why we use BrowserRouter here ? because the Header component is using the Link component from react-router-dom to navigate to different routes in our application, and in order for the Link component to work properly in our test environment, we need to provide a routing context using the BrowserRouter component. By wrapping our Header component with the BrowserRouter, we can ensure that the Link component can function correctly and allow us to test the navigation functionality of our Header component without causing a full page reload, which is essential for testing single-page applications built with React Router.
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  // Querying
  // getByRole is a method provided by the screen object from the @testing-library/react library that allows us to query the rendered component for elements based on their role attribute. It takes a string as an argument that specifies the role of the element we want to query. In this case, we are using getByRole to query for a button element with the name "Login" in the Header component. By calling screen.getByRole("button", { name: "Login" }), we can retrieve the button element from the rendered Header component and make assertions about its presence and content in our test cases.
  const loginButton = screen.getByRole("button", { name: "Login" });

  //const loginButton = screen.getByText("Login");

  expect(loginButton).toBeInTheDocument();
});

it("Should render Header Component with a Cart items 0 ", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const cartItems = screen.getByText("Cart - (0 items)");

  expect(cartItems).toBeInTheDocument();
});

it("Should render Header Component with a Cart item ", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  // can use regex as well in search patterns
  const cartItems = screen.getByText(/Cart/);

  expect(cartItems).toBeInTheDocument();
});

it("Should change Login Button to Logout on click", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", { name: "Login" });

  // what is the fireEvent ? fireEvent is a utility provided by the @testing-library/react library that allows us to simulate user interactions with the rendered component in our test cases. It provides various methods to simulate different types of events, such as click, change, submit, etc. In this case, we are using fireEvent.click to simulate a click event on the login button in the Header component. By calling fireEvent.click(loginButton), we can trigger the onClick event handler associated with the login button and test the functionality that changes the button text from "Login" to "Logout" when it is clicked. This allows us to verify that the state update and re-rendering of the Header component are working correctly in response to user interactions.

  fireEvent.click(loginButton);

  const logoutButton = screen.getByRole("button", { name: "Logout" });

  expect(logoutButton).toBeInTheDocument();
});