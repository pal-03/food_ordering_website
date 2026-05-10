import { useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import ItemList from "./ItemList";
import { useDispatch } from "react-redux";

const Cart = () => {
  // Subscribing to the store using a Selector
  // subscribe to the right portion of the store that we need in this component, in this case we need the items array from the cart state in the Redux store, so we use the useSelector hook to access the cart state and get the items array, and then we can use this items array to render the list of items in the cart and also to show the number of items in the cart in the header component. By using useSelector, we can ensure that our Cart component will re-render whenever the items array in the cart state changes, allowing us to keep our UI in sync with the state of our application.
  const cartItems = useSelector((store) => store.cart.items);

  console.log(cartItems);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    // dispatch an action to clear the cart
    // when we dispatch the clearCart action, it will send an action object with a type property that corresponds to the reducer function defined in the cartSlice, and a payload property that contains the data needed to update the state, in this case it will send an action object like this
    // {
    //     type: "cart/clearCart",
    //     payload: undefined,
    // }
    // and then it will send this action to the reducer function defined in the cartSlice, and the reducer function will handle this action and update the state of the cart accordingly, in this case it will clear the items array in the cart state, and then it will return the new state of the cart, which will be used to update the UI in our components that are subscribed to the cart state in the Redux store.  
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className=" p-2 m-2 bg-black text-white rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems?.length === 0 && (
          <h1> Cart is empty. Add Items to the cart!</h1>
        )}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;