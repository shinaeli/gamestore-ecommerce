import { createContext, useState } from "react"

export const CartContext = createContext();

// NOTE: A Context Provider is simply a react component that provides the context value to its children
export const CartContextProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);

    // 'addToCart' function accepts 'product', 'price' and 'noOfProduct' as its argumments
    const addToCart = (product, price, noOfProduct) => {
        // If 'CartItem' array is empty
        if(cartItem.length === 0) {
            // Add an object which consists of 'id', 'product', 'price' and 'noOfProduct' to the empty 'cartItem' array
            setCartItem([{id: (Math.random() * 50).toFixed(), product, price, noOfProduct}]);
        } else {
            // Find the item whose name is the same as the 'product' argument and assign it to the variable 'findCartItem' if found
            const findCartItem = cartItem.find(item => item.product === product);
            if(!findCartItem) {
                // If the item doesn't exist in the 'cartItem' array, create an object called createdItem which consists of 'id', 'product', 'price' and 'noOfProduct' to the empty 'cartItem' array usiing the spread operator
                let createdItem = {id: (Math.random() * 5000).toFixed(), product, price, noOfProduct};
                setCartItem(prev => [createdItem, ...prev]);
            } else {
                // Update the properies of 'findCartItem' with the 'product', 'price' and 'noOfProduct' arguments provided using object destructuring
                // Assign the updated object to the variable called 'updatedCartItem'
                const updatedCartItem = {...findCartItem, product, price, noOfProduct};
                setCartItem([updatedCartItem, ...cartItem.filter(item => item.id !== updatedCartItem.id)]);
            }
        }
    } 

    return (
        <CartContext.Provider value={{ cartItem, addToCart }}>
            {children}
        </CartContext.Provider>
    )
};