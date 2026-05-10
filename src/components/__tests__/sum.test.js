import { sum } from "../sum";

// test is a global function provided by the Jest testing framework that allows us to define a test case. It takes two arguments: a string that describes the test case and a callback function that contains the actual test code. In this case, we are defining a test case for the sum function, which should calculate the sum of two numbers. The callback function will contain the logic to call the sum function with specific inputs and assert that the output is correct using Jest's expect function.
test("Sum function should caculate the sum of two numbers", () => {
  const result = sum(3, 4);

  //Assertion
  // expect is a global function provided by Jest that allows us to make assertions about the expected output of our code. It takes a value as an argument and returns an object with various matcher functions that we can use to compare the expected value with the actual value returned by our code. In this case, we are using the toBe matcher to assert that the result of calling the sum function with 3 and 4 should be equal to 7. If the assertion fails, Jest will throw an error and indicate that the test case has failed.
  
  // other matcher functions provided by Jest include toEqual, toBeTruthy, toBeFalsy, toContain, toHaveLength, and many more, which allow us to make different types of assertions based on the expected output of our code. By using expect and its various matcher functions, we can write comprehensive test cases that verify the correctness of our code and ensure that it behaves as expected under different conditions.
  expect(result).toBe(7);
});