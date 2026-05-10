import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex, dummy }) => {
    const handleClick = () => {
        setShowIndex();
        // when the category is clicked, we will update the showIndex state in the parent component to the index of the clicked category, which will trigger a re-render and show the items for that category
    };
    return (
        <div>
            {/* Header */}
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
                {/* This is just the header and it has a click handler*/}
                <div
                    className="flex justify-between cursor-pointer"
                    onClick={handleClick}
                >
                    {/* // show the title and the number of items in the category, and also show an arrow down icon to indicate that it's an accordion */}
                    <span className="font-bold text-lg">
                        {data.title} ({data.itemCards.length})
                    </span> 
                    <span>⬇️</span>
                </div>
                {/* Now this is the body  */}

                {/* // Items cards have the data for the items/accordions */}
                {showItems && <ItemList items={data.itemCards} dummy={dummy} />}
            </div>
        </div>
    );
};

export default RestaurantCategory;
