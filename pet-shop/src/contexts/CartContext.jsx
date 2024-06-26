
import React, { createContext, useState } from 'react'

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) =>{
      setCart((prevCart)=>{
        const existingProduct = prevCart.find((item)=> item.id === product.id);
        if(existingProduct){
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      })
    }

    const removeFromCart = (id) =>{
      setCart(cart.filter(item => item.id !== id));
    }

    const updateQuantity = (id, quantity) =>{
      setCart(cart.map(item => item.id === id ? {...item, quantity}:item))
    }



  return (
    <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, updateQuantity}}>
      {children}
    </CartContext.Provider>
  )
}
