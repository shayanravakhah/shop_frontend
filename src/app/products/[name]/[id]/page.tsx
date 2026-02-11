"use client"
import { use, useEffect, useState } from "react"
import AddCardIcon from '@mui/icons-material/AddCard';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface products {
  product_id: number,
  category_id: number,
  name: string,
  url: string,
  description: string,
  price: number
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<products>({ name: "", product_id: -1, category_id: -1, url: "", description: "", price: 0 });
  const { id } = use(params);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`https://shopbackend-production-df00.up.railway.app/product/${id}`);
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);


  function SetStorage() {
    if (!localStorage.getItem(`${id}`)) {
      localStorage.setItem(`${id}`, "1");
      alert("The product was added to the cart")
    } else {
      alert("You already select this product");
    }
  }

  return (
    <div className="w-full min-h-screen max-h-full bg-[#e9e6e6] py-44 flex justify-center">
      {
        product.product_id !== -1 ?
          <div className="w-full lg:w-4/5 px-5">
            <div className="flex gap-y-7 md:gap-y-0 md:gap-x-10 flex-wrap md:flex-nowrap">
              <div className="w-full md:w-1/2 bg-white rounded-lg flex justify-center">
                <img className="rounded-xl w-full object-cover" src={product.url} alt={product.name} />
              </div>
              <div className="w-full md:w-1/2 bg-white rounded-lg px-4 py-5">
                <div className="text-xl font-bold text-center ">{product.name}</div>
                <div className="text-gray-400 my-2 text-justify">{product.description}</div>
                <div className="flex justify-between w-full pt-7">
                  <div className="flex items-center justify-center">Price : {product.price}$</div>
                  <button
                    className="flex gap-2 py-1 px-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-800 shadow-gray-400"
                    onClick={SetStorage}
                  >
                    <AddCardIcon></AddCardIcon>
                    <p>Add item</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          :
          <div className='w-full h-screen flex flex-col items-center p-10'>
            <CircularProgress className='text-green-500'></CircularProgress>
            <Typography className='text-center mt-4 text-green-700 text-lg '>Loading data, check your internet and wait for Railway response and run your VPN  </Typography>
          </div>
      }
    </div>
  );
}
