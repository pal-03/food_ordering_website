import { useRouteError } from "react-router-dom";

// useRouteError is a hook provided by react-router-dom that allows us to access the error object that is thrown when a route fails to load, it can be used in an error boundary component to display a custom error message or perform any other error handling logic when a route fails to load, it returns the error object that was thrown during the rendering of the route, which can contain information about the error such as the status code and status text

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
        <div>
            <h1>Oops!!!</h1>
            <h2> Something went wrong!!</h2>
            <h3>
                {err.status}: {err.statusText}
            </h3>
        </div>
    );
};

export default Error;
