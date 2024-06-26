import React, { createContext, useState } from 'react'

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    const addProduct = (product) =>{
      setProducts((prevProduct)=>{
        return[...prevProduct, product]
      })
    }

    const removeFromProducts = (id) =>{
      setProducts(products.filter(item => item.id !== id));
    }

    // const updateQuantity = (id, quantity) =>{
    //   setCart(products.map(item => item.id === id ? {...item, quantity}:item))
    // }



  return (
    <ProductContext.Provider value={{products, setProducts, addProduct, removeFromProducts }}>
      {children}
    </ProductContext.Provider>
  )
}
