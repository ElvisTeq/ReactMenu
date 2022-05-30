import React from "react";

const CartContext = React.createContext({
  // data added here for autocompletion
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
