import React, { useEffect, useState } from "react"
import { SingleProduct } from "./SingelProduct";
// import { productsList } from "../../dataLists/dataLists";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchComponent from "../../Components/Search";

export function Products() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8002/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  
  

  return (
    <div>
      <SearchComponent />
    {params.id ? (<div>Single Product</div>) : (<div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your pet is Hungry</h2>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <SingleProduct key={product.id} product={product}/>
            ))}
        </div>
      </div>
    </div>) }
    </div>
  )
}
