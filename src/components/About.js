import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";
import UserContext from "../utils/UserContext";

class About extends Component {
    constructor(props) {
        super(props);

        //console.log("Parent Constructor");
    }

    // Called after the child is rendered complelty. Hence child lifecycle is completed first then it resumes and parents life cycle methods are called. Hence child componentDidMount is called first then parent componentDidMount is called.
    componentDidMount() {
        //console.log("Parent Component Did Mount");
    }

    render() {
        //console.log("Parent Render");
        return (
            <div>
                <h1>About Class Component</h1>
                <div>
                    LoggedIn User
                    {/* Since we do not have hooks in class based components */}
                    {/* // We can use the Consumer component provided by the context API to consume the context value in class based components. The Consumer component is a higher order component that takes a function as a child, which receives the current context value as an argument and returns a React node. This allows us to access the context value in our class based component and render it accordingly. */} */
                    <UserContext.Consumer>
                        {({ loggedInUser }) => (
                        <h1 className="text-xl font-bold">{loggedInUser}</h1>
                        )}
                    </UserContext.Consumer>
                </div>
                <h2>This is Namaste React Web Series</h2>
                {/* <User name={"Raju man"}> */}
                <UserClass name={"First"} location={"Dehradun Class"} />
            </div>
        );
    }
}

export default About;

// Rafce is a shortcut for creating a functional component in React, it stands for "React Arrow Function Component", it allows us to quickly create a functional component with an arrow function syntax, which is a more concise way of writing components in React.

/// Order Life cycle
// Parent Constructor
// Parent Render

/* Render Phase is batched by react here  */
// Child1 Constructor
// Child1 Render
// Child2 Constructor
// Child2 Render

/* Commit Phase is batched by react here, it is executed immediately after the render phase, and it is responsible for updating the DOM and performing any side effects that are needed after the component has been rendered, such as making API calls or updating the UI based on the new state. */
// Child1 Component Did Mount
// Child2 Component Did Mount


// Parent Component Did Mount
