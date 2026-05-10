
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items, dummy }) => {
    const dispatch = useDispatch(); // dispatch is a function provided by the react-redux library that allows us to dispatch actions to the Redux store from our React components. It is used to send actions to the store, which will then be handled by the reducers to update the state of the application accordingly. In this case, we are using dispatch to send an action to add an item to the cart when the "Add" button is clicked for a specific item in the ItemList component. By calling dispatch with the addItem action creator and passing the item as an argument, we can update the cart state in our Redux store and reflect those changes in our UI, such as showing the updated number of items in the cart or rendering a list of items in the cart dropdown.

    const handleAddItem = (item) => {
        // Dispatch an action
        dispatch(addItem(item));
        // when u dispatch this action, redux will create an object and it will create a payload like this
        // {
        //     type: "cart/addItem",
        //     payload: item,
        // }
        // and then it will send this action to the reducer function defined in the cartSlice, and the reducer function will handle this action and update the state of the cart accordingly, in this case it will add the item to the items array in the cart state, and then it will return the new state of the cart, which will be used to update the UI in our components that are subscribed to the cart state in the Redux store.    
    };
    return (
        <div>
            {items.map((item) => (
                <div
                    data-testid="foodItems"
                    key={item.card.info.id}
                    className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
                >
                    {/* Name price and desc */}
                    <div className="w-9/12">
                        <div className="py-2">
                            <span>{item.card.info.name}</span>
                            <span>
                                - ₹
                                {item.card.info.price
                                    ? item.card.info.price / 100
                                    : item.card.info.defaultPrice / 100}
                            </span>
                        </div>
                        <p className="text-xs">{item.card.info.description}</p>
                    </div>
                    {/* Add button  */}
                    <div className="w-3/12 p-4">
                        <div className="absolute">
                            <button
                                className="p-2 mx-16 rounded-lg bg-black text-white shadow-lg"
                                onClick={() => handleAddItem(item)}
                            >Add +</button>
                        </div>
                        <img src={CDN_URL + item.card.info.imageId} className="w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;