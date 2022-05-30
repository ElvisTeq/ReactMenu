import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // .findIndex() => returns the first index of the element that satisfies the function (runs each time we click on "ADD")
    const existingCartItemIdex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // Find duplicate Item
    const existingCartItem = state.items[existingCartItemIdex];
    let updatedItems;

    // Merge duplicate items, calculate total
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items]; // Store all prev.items
      updatedItems[existingCartItemIdex] = updatedItem; // Update/Add merged item
    } else {
      updatedItems = state.items.concat(action.item); // .concat => to merge array, returns new array
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // prev.amount + new item price * quantity

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

// Provides data for "cart-context" module and all other Modules
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    // item => will be pass as "action.item" to the "cartReducer"
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
