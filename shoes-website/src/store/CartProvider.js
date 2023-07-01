import { useState } from "react";
import CartContext from "./cart-context";
import axios from "axios";
const items = [];
const SHOES = [];

const CartProvider = (props) => {
  const [cartState, SetCartState] = useState(items);
  const [shoesState,setShoesState]=useState(SHOES)

  const addShoes = (obj)=>{
    setShoesState((pre)=>{return [obj,...pre]})
    axios.post(`https://crudcrud.com/api/4ed6813b5b0a43978f1f93a2768bfafa/${obj}`, {
      data: obj
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const addShoesToCart = (item)=> {
    SetCartState((preState) => {
      return [item, ...preState];
  })
}

  const removeShoesFromCart = (id) => {   
    SetCartState( cartState.filter(item => item.id !== id))
  };

  const cartContext = {
    items: cartState,
    totalAmount: 0,
    addItem: addShoesToCart,
    removeItem: removeShoesFromCart,
    addList:addShoes,
    shoes:shoesState
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
