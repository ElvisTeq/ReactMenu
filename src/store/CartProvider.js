import CartContext from "./cart-context";

// Provides data for "cart-context" module and all other Modules
const CartProvider = (props) => {
  const addItemToCartHandler = (item) => {};

  const removeItemFromCartHandler = (id) => {};

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  // value={cartContext} => passing data to "cart-context"
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
