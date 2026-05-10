import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import Body from "../Body";
import MOCK_DATA from "../mocks/mockResListData.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// fecth is a superpower of browseer but now if we have to use it in this environmemt then we have to mock it, so we are mocking the fetch function to return a promise that resolves to an object with a json method that returns a promise that resolves to our mock data, this way we can test our component without making actual API calls and we can control the data that is returned by the fetch function for our tests. This is useful for testing different scenarios and edge cases in our component without relying on external APIs or network conditions.
global.fetch = jest.fn(() => {
  // returning a promise that resolves to an object with a json method that returns a promise that resolves to our mock data, this way we can test our component without making actual API calls and we can control the data that is returned by the fetch function for our tests. This is useful for testing different scenarios and edge cases in our component without relying on external APIs or network conditions.
  return Promise.resolve({
    ok: true,
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should Search Res List for burger text input ", async () => {
  // what is act ? act is a function provided by the react-dom/test-utils library that allows us to wrap our test code in a way that ensures that all updates to the component are processed and applied before we make assertions on the component's state or output. It helps to ensure that our tests are reliable and consistent by allowing us to wait for all updates to be processed before making assertions, which can help to prevent issues with asynchronous updates or state changes in our components during testing. By using act, we can ensure that our tests accurately reflect the behavior of our components and provide reliable results.
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  // get cards before search to check how many cards are there before search, we are using getAllByTestId to get all the elements with the data-testid attribute set to "resCard", this will return an array of all the restaurant cards rendered in the Body component, and we can check the length of this array to verify how many restaurant cards are displayed before performing the search action.
  const cardsBeforeSearch = screen.getAllByTestId("resCard");

  expect(cardsBeforeSearch.length).toBe(20);

  const searchBtn = screen.getByRole("button", { name: "Search" });

  const searchInput = screen.getByTestId("searchInput");

  // simulate user typing "burger" in the search input field and clicking the search button, we are using fireEvent.change to simulate a change event on the search input field, which updates the value of the input field to "burger". Then we are using fireEvent.click to simulate a click event on the search button, which triggers the search functionality in our component. This allows us to test how our component responds to user interactions and verify that the search functionality is working correctly by checking the number of restaurant cards displayed after performing the search action.
  fireEvent.change(searchInput, { target: { value: "burger" } });

  fireEvent.click(searchBtn);

  //  get cards after search to check how many cards are there after search, we are using getAllByTestId to get all the elements with the data-testid attribute set to "resCard", this will return an array of all the restaurant cards rendered in the Body component after performing the search action, and we can check the length of this array to verify how many restaurant cards are displayed after performing the search action. This allows us to test the functionality of our search feature and ensure that it is filtering the restaurant list correctly based on the search input.
  const cardsAfterSearch = screen.getAllByTestId("resCard");

  expect(cardsAfterSearch.length).toBe(4);
});

it("Should filter Top Rated Restaurant", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const cardsBeforeFilter = screen.getAllByTestId("resCard");

  expect(cardsBeforeFilter.length).toBe(20);

  const topRatedBtn = screen.getByRole("button", {
    name: "Top Rated Restaurants",
  });
  fireEvent.click(topRatedBtn);

  const cardsAfterFilter = screen.getAllByTestId("resCard");
  expect(cardsAfterFilter.length).toBe(13);
});
