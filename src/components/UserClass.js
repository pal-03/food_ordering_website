import React from "react";

// Class based component
// Normal JS class
// To make it a react component we need to extend the React.Component class
// React.component is a class given to us by react library, it provides us with the functionality to create a react component, it has a render method that we need to override in our class to define the UI of our component, it also provides us with lifecycle methods that we can use to perform certain actions at different stages of the component's lifecycle, such as when the component is mounted, updated, or unmounted.
class UserClass extends React.Component {
    // to receive the props sent from the parent component, we need to define a constructor in our class and call the super(props) method to pass the props to the parent class, this allows us to access the props in our component using this.props, we can also initialize the state of our component in the constructor by defining a state object and setting its initial values, this state can be used to manage the data and behavior of our component, and it can be updated using the setState method, which will trigger a re-render of the component with the updated state.
    constructor(props) {
        // Have to call super(props) to pass the props to the parent class, if we do not call super(props) then we will not be able to access the props in our component and it will throw an error, also we can initialize the state of our component in the constructor by defining a state object and setting its initial values, this state can be used to manage the data and behavior of our component, and it can be updated using the setState method, which will trigger a re-render of the component with the updated state.
        super(props);

        // state variables in class based components are defined as an object, we can have multiple state variables in a class based component, and we can update the state using the setState method, which takes an object as an argument and updates the state with the new values, this will trigger a re-render of the component with the updated state.
        this.state = { // This will contain all the state variables
            userInfo: {
                name: "Dummy", // Deafult value for the state varaibale
                location: "Default",
            },
            // count : 0,
            // This is how we can define multiple state variables in a class based component, we can have as many state variables as we want, and we can update them using the setState method, which will trigger a re-render of the component with the updated state.
        };
        // this.setState(object pass which will have updated value of the state variable) is a method provided by the React.Component class that allows us to update the state of our component, it takes an object as an argument and updates the state with the new values, this will trigger a re-render of the component with the updated state, we can also pass a callback function as a second argument to setState, which will be called after the state has been updated and the component has been re-rendered, this can be useful for performing certain actions after the state has been updated, such as making an API call or updating the UI based on the new state.
        console.log(this.props.name + "Child Constructor");
    }

    // Constructor -> render -> componentDidMount -> API Call -> setState -> render (with updated state) -> componentDidUpdate
    async componentDidMount() {
        //console.log(this.props.name + "Child Component Did Mount");
        // Api call

        const data = await fetch("https://api.github.com/users/swayamp-zeta");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });

        console.log(json);
    }

    // Called after the component is updated, it is called every time the state or props of the component changes, it is used to perform certain actions after the component has been updated, such as making an API call or updating the UI based on the new state, it is also used to compare the previous state and props with the current state and props to determine if certain actions need to be taken, such as making an API call or updating the UI based on the new state.
    componentDidUpdate() {
        console.log("Component Did Update");
    }

    // Unmount means removing the component from the DOM, it is called when the component is removed from the DOM, it is used to perform certain actions before the component is removed from the DOM, such as cleaning up any resources that were used by the component, such as event listeners or timers, it is also used to cancel any ongoing API calls or subscriptions that were made by the component, to prevent memory leaks and ensure that the component is properly cleaned up when it is removed from the DOM.
    componentWillUnmount() {
        console.log("Component Will Unmount");
        // cleanup resources like event listeners, timers, cancel API calls, etc to prevent memory leaks and ensure that the component is properly cleaned up when it is removed from the DOM.
        // cancel pending request to the server, if we do not cancel the pending request then it will continue to run in the background and it will consume resources and it will also cause memory leaks, to cancel the pending request we can use the AbortController API provided by the browser, we can create an instance of the AbortController and pass it to the fetch request as a signal, and then we can call the abort method on the controller instance to cancel the request when the component is unmounted.
    }

    // render method is used to render the UI of the component, it is a required method in class based components, it should return a JSX element that represents the UI of the component, it is called every time the state or props of the component changes, and it should be a pure function that does not modify the state or props of the component.
    render() {
        console.log(this.props.name + "Child Render");

        const { name, location, avatar_url } = this.state.userInfo;
        return (
            <div className="user-card">
                <img src={avatar_url} />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: @swayamp</h4>
            </div>
        );
    }
}

export default UserClass;

/****
 *
 * --- MOUNTING ----
 *
 * Constructor (dummy)
 * Render (dummy)
 *      <HTML Dummy >
 * Component Did MOunt
 *      <API Call>
 *      <this.setState> -> State variable is updated
 *
 * ---- UPDATE Lifecycle ----
 *
 *      render(APi data)
 *      <HTML (new API data>)
 *      ccomponentDid Update
 *
 * 
 *
 *
 */
