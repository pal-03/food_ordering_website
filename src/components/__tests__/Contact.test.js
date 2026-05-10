import { render, screen } from "@testing-library/react"; // render is a function provided by the @testing-library/react library that allows us to render a React component in a test environment. It takes a React element as an argument and returns an object that contains various methods to query the rendered component, such as getByRole, getByText, getByPlaceholderText, etc. In this case, we are using the render function to render the Contact component in our test cases, which allows us to interact with the rendered component and make assertions about its behavior and appearance using the screen object provided by the testing library.
import Contact from "../Contact";
import "@testing-library/jest-dom";

// why are we not using expect here ?
// describe is a global function provided by Jest that allows us to group related test cases together. It takes two arguments: a string that describes the group of tests and a callback function that contains the actual test cases. In this case, we are using describe to group all the test cases related to the Contact Us page component. By using describe, we can organize our tests in a more structured way and make it easier to understand the purpose of each test case within the context of the Contact Us page. The expect function is used within each individual test case to make assertions about the expected output of our code, while describe is used to provide a higher-level organization for those test cases.

describe("Contact Us Page Test Case", () => {
  // beforeAll, beforeEach, afterAll, afterEach are lifecycle methods provided by Jest that allow us to set up and tear down our test environment before and after running our test cases. beforeAll is a function that runs once before all the test cases in a describe block, while beforeEach runs before each individual test case. Similarly, afterAll runs once after all the test cases have completed, and afterEach runs after each individual test case. These lifecycle methods can be used to perform setup tasks such as initializing variables, creating mock data, or cleaning up resources after tests have run. By using these lifecycle methods, we can ensure that our tests are isolated and do not interfere with each other, and we can also improve the readability and maintainability of our test code by organizing setup and teardown logic in a consistent way.
  // beforeAll(() => {
  //   console.log("Before All");
  // });

  // beforeEach(() => {
  //   console.log("Before Each");
  // });

  // afterAll(() => {
  //   console.log("After All");
  // });

  // afterEach(() => {
  //   console.log("After Each");
  // });

  it("Should load contact us component", () => {
    render(<Contact />);

    // Querying
    // getByRole is a method provided by the screen object from the @testing-library/react library that allows us to query the rendered component for elements based on their role attribute. It takes a string as an argument that specifies the role of the element we want to query. In this case, we are using getByRole to query for a heading element in the Contact component. By calling screen.getByRole("heading"), we can retrieve the heading element from the rendered Contact component and make assertions about its presence and content in our test cases.
    // other querying methods provided by the screen object include getByText, getByPlaceholderText, getByLabelText, getByAltText, and many more, which allow us to query for elements based on their text content, placeholder text, label text, alt text, and other attributes. By using these querying methods, we can interact with the rendered component in our test cases and make assertions about its behavior and appearance.
    const heading = screen.getByRole("heading");

    // Assertion
    // toBeInTheDocument is a matcher function provided by the @testing-library/jest-dom library that allows us to assert that a specific element is present in the rendered component. It is used in conjunction with the expect function from Jest to make assertions about the presence of elements in our test cases. In this case, we are using expect(heading).toBeInTheDocument() to assert that the heading element we queried for using getByRole is indeed present in the rendered Contact component. If the assertion fails, Jest will throw an error and indicate that the test case has failed, which helps us ensure that our Contact component is rendering correctly and includes the expected heading element.
    expect(heading).toBeInTheDocument();
  });

  it("Should load button inside Contact component", () => {
    render(<Contact />);

    const button = screen.getByRole("button");

    // Assertion
    expect(button).toBeInTheDocument();
  });

  it("Should load input name inside Contact component", () => {
    render(<Contact />);

    const inputName = screen.getByPlaceholderText("name");

    // Assertion
    expect(inputName).toBeInTheDocument();
  });

  it("Should load 2 input boxes on the Contact component", () => {
    render(<Contact />);

    // Querying
    // getAllByRole is a method provided by the screen object from the @testing-library/react library that allows us to query the rendered component for all elements that match a specific role attribute. It takes a string as an argument that specifies the role of the elements we want to query. In this case, we are using getAllByRole to query for all textbox elements in the Contact component. By calling screen.getAllByRole("textbox"), we can retrieve an array of all textbox elements from the rendered Contact component and make assertions about their presence and quantity in our test cases.
    const inputBoxes = screen.getAllByRole("textbox");

    //console.log(inputBoxes.length);

    // Assertion

    expect(inputBoxes.length).toBe(2);
  });
});