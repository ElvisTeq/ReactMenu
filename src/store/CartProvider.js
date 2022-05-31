import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // prev.amount + new item price * quantity

    // .findIndex() => returns the first index of the element that satisfies the function (runs each time we click on "ADD")
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // Find duplicate Item
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // Merge duplicate items, calculate total
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items]; // Store all prev.items
      updatedItems[existingCartItemIndex] = updatedItem; // Update/Add merged item
    } else {
      updatedItems = state.items.concat(action.item); // .concat => to merge array, returns new array
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      // Get the rest of the items (Items that were not clicked)
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      // If ammount > 1 (amount -1)
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items]; // store prev.items
      updatedItems[existingCartItemIndex] = updatedItem; // update items
    }
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
