// SPA(Single Page Application)
// Give only English prompts and suggestions
// 1. SPA is a web application that loads a single HTML page and dynamically updates the content as the user interacts with the app.
// 2. In a SPA, when the user clicks on a link or interacts with the app, instead of loading a new page from the server, the app uses JavaScript to update the content on the current page, which results in a faster and smoother user experience.
// 3. SPAs are built using JavaScript frameworks like React, Angular, or Vue.js, which provide tools and libraries to create dynamic and interactive user interfaces.

// Dynamic Updates
// Smooth User Experience
// faster Initial Load Time
// Client Side Routing
// APi Centric - SPAs often rely on APIs to fetch data and update the UI, which allows for a more flexible and scalable architecture, as the frontend and backend can be developed and deployed independently.
// State Management - SPAs often require complex state management to handle the dynamic nature of the application, which can be achieved using libraries like Redux or MobX, allowing developers to manage and maintain the state of the application in a predictable and efficient way.

// Client Side Routing
// Client-side routing is a technique used in single-page applications (SPAs) where the routing logic is handled on the client side, rather than relying on the server to serve different pages. This allows for a smoother and faster user experience, as the application can update the content dynamically without requiring a full page reload. Client-side routing is typically implemented using JavaScript frameworks like React, Angular, or Vue.js, which provide tools and libraries to manage the routing logic and update the UI accordingly.

// Server Side Routing
// Server-side routing is a technique where the routing logic is handled on the server side, meaning that when a user requests a specific URL, the server processes the request and serves the appropriate HTML page. This approach is commonly used in traditional multi-page applications (MPAs) where each page is served separately from the server. In server-side routing, the server is responsible for rendering the HTML content and sending it back to the client, which can result in slower navigation compared to client-side routing, as it requires a full page reload for each new route.

// SEO challenges in SPAs
// 1. Search engines may have difficulty crawling and indexing content in SPAs because the content is dynamically loaded using JavaScript, which can lead to incomplete or inaccurate indexing of the site's pages.
// 2. SPAs often rely on client-side rendering, which can make it difficult for search engines to understand the structure and hierarchy of the content, leading to poor SEO performance.
// SSR (Server-Side Rendering) is a technique used in web development where the server generates the HTML content for a web page and sends it to the client, allowing for faster initial load times and improved SEO performance. In SSR, the server processes the request, renders the React components into HTML, and sends the fully rendered page to the client, which can be beneficial for search engine crawlers that may have difficulty indexing content in SPAs (Single Page Applications) that rely on client-side rendering.

// GraphQL api
// GraphQL is a query language for APIs that allows clients to request only the data they need, making it more efficient and flexible than traditional REST APIs. With GraphQL, clients can specify the structure of the response they want, and the server will return only the requested data, reducing over-fetching and under-fetching of data. GraphQL also supports real-time updates through subscriptions, allowing clients to receive updates when data changes on the server. Overall, GraphQL provides a more efficient and powerful way to interact with APIs compared to REST.

// Here with the swiggy menu api, we are fetching the entire menu data for a restaurant, which can be quite large and may contain a lot of unnecessary information that we don't need to display on the menu page. This can lead to slower load times and increased bandwidth usage, especially for users with slower internet connections. Additionally, if the menu data changes frequently, we would need to fetch the entire menu again to get the updated information, which can further impact performance. By using GraphQL, we could request only the specific fields we need for the menu page, such as item names, prices, and images, which would result in faster load times and reduced bandwidth usage.

// Route from react-router-dom
// Router and Route do 
// 1. Router is a component that provides the routing context for the application, while Route is a component that defines a specific route and the component to render when that route is accessed.
// 2. Router is typically used at the top level of the application to wrap the entire app, while Route is used to define individual routes within the Router.
// 3. Router manages the history and navigation of the application, while Route is responsible for rendering the appropriate component based on the current URL path.
// 4. Router can be used to define nested routes and handle route parameters, while Route is focused on rendering the component for a specific path.

// createHashRouter is a function/component from the react-router-dom library that creates a router object that uses the hash portion of the URL to keep track of the current location, it is typically used in applications that are served from static file servers or when you want to support older browsers that do not support the HTML5 history API, it allows for client-side routing without requiring server-side configuration, as the hash portion of the URL is not sent to the server.

// Single Responsibility Principle
// The Single Responsibility Principle is a software design principle that states that a class or module should have only one reason to change, meaning that it should have only one responsibility or job. This principle helps to promote modularity and maintainability in software development, as it allows for easier testing, debugging, and code reuse. By adhering to the Single Responsibility Principle, developers can create more focused and cohesive code that is easier to understand and maintain over time.

// Chunking/Code Splitting/Lazy Loading/Dynamic Bundling
// Chunking, also known as code splitting, is a technique used in web development to break down a large JavaScript bundle into smaller, more manageable pieces or chunks. This allows for faster load times and improved performance, as the browser can load only the necessary chunks of code when needed, rather than loading the entire bundle at once. Code splitting can be achieved using tools like Webpack or Rollup, which allow developers to define entry points and specify how the code should be split into chunks based on factors such as route-based splitting or dynamic imports. Overall, chunking helps to optimize the loading and execution of JavaScript code in web applications.

// Parcel uses postcssrc to understand tailwindcss configuration, which is necessary for processing the CSS files correctly. The postcssrc file contains the configuration for PostCSS, which is a tool that allows you to transform CSS with JavaScript plugins. In this case, it includes the tailwindcss plugin, which is essential for using Tailwind CSS in your project. By having the postcssrc file with the appropriate configuration, Parcel can properly process and apply Tailwind CSS styles to your application.

// Higher Order Component (HOC)
// A Higher Order Component (HOC) is a function that takes a component and returns a new component with enhanced functionality. HOCs are used in React to reuse component logic and add additional features to existing components without modifying their original implementation. They allow developers to abstract away common patterns and behaviors, such as authentication, data fetching, or state management, and apply them to multiple components in a consistent way. HOCs can be created using functions that wrap the original component and provide additional props or logic, making it easier to share functionality across different parts of an application.

// Redux Toolkit
// Redux Toolkit is a library that provides a set of tools and utilities to simplify the process of using Redux for state management in JavaScript applications. It includes features such as a simplified API for creating actions and reducers, built-in support for asynchronous actions, and a powerful middleware system. Redux Toolkit helps to reduce boilerplate code and improve the developer experience when working with Redux, making it easier to manage application state in a predictable and efficient way.

// redux store
// In Redux, a store is an object that holds the application state and provides methods to access and update that state. It is the central hub of a Redux application, where all the state changes occur. The store is created using the createStore function from the Redux library, and it takes a reducer function as an argument, which defines how the state should be updated based on different actions. The store also provides methods such as getState() to retrieve the current state, dispatch() to send actions to the reducers, and subscribe() to listen for changes in the state. Overall, the store is a crucial component of the Redux architecture that allows for predictable state management in JavaScript applications.
// slices are small pieces of the Redux store that manage a specific part of the application state, they are created using the createSlice function from the Redux Toolkit library, which allows developers to define the initial state, reducers, and actions for that slice in a concise and organized way. Each slice is responsible for managing its own state and logic, making it easier to maintain and scale the application as it grows. Slices help to keep related state and logic together, improving code organization and maintainability in Redux applications.

// write data to cart
// we click on on the add button on an item in the menu, it will dispatch an action to the Redux store, which will then update the state of the cart by adding the selected item to it. It calls a function and this function will modify the cart state in the Redux store by adding the selected item to it, and then the UI will re-render to reflect the updated cart state, showing the newly added item in the cart.
// the function is called a reducer. A reducer is a pure function that takes the current state and an action as arguments and returns a new state based on the action type. In this case, the reducer will handle the action dispatched when the add button is clicked, and it will update the cart state by adding the selected item to it. The reducer will then return the new state of the cart, which will trigger a re-render of the UI to reflect the changes in the cart.

// read data from cart
// Selector is used. this is called subscribing to the store

// Slices in redux toolkit
// In Redux Toolkit, a slice is a collection of Redux reducer logic and actions for a specific feature or domain of the application. It is created using the createSlice function, which takes an object that defines the name of the slice, the initial state, and the reducers that handle different actions. Each reducer is a function that takes the current state and an action as arguments and returns a new state based on the action type. The createSlice function automatically generates action creators and action types based on the reducers defined in the slice, making it easier to manage and organize state logic in a Redux application. Slices help to keep related state and logic together, improving code organization and maintainability.

// Dispatch Function in Redux
// In Redux, the dispatch function is a method that allows you to send actions to the Redux store. It is used to trigger state changes in the application by dispatching an action object that describes the type of action being performed and any relevant data. When an action is dispatched, the Redux store processes the action through the reducers, which update the state accordingly. The dispatch function is typically accessed through the useDispatch hook in React components or directly from the store in non-React applications. It is a fundamental part of the Redux architecture and is essential for managing state changes in a predictable way.

// reduceer called with state and action
// reducer returns new state based on action type
// store updates state and notifies subscribers
