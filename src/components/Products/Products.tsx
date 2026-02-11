"use client"
import { useEffect, useState } from 'react'
import CardProduct from './CardProduct'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';



interface productInfo {
  url: string,
  name: string,
  product_id: number,
  price: number,
  category_id: number,
  description: string
}

export default function Products({ link }: { link: string }) {

  const categoryID: number = Number(link.split("(")[1].split(")")[0]);
  const [info, setInfo] = useState<productInfo[]>([]);
  useEffect(() => {
    fetch(`https://shopbackend-production-df00.up.railway.app/products/${categoryID}`)
      .then(response => response.json())
      .then(data => {
        console.log(data[0].id_product);
        setInfo(data)
      });
  }, [])

  return (
    <div className='w-full h-full '>
      <div className='w-full flex justify-center mt-16 py-4 text-2xl font-semibold'>Products</div>
      {
        info.length == 0 ?
          <div className='w-full h-screen flex flex-col items-center p-10'>
            <CircularProgress className='text-green-500'></CircularProgress>
            <Typography className='text-center mt-4 text-green-700 text-lg '>Loading data, check your internet and wait for Railway response and run your VPN  </Typography>
          </div>
          :
          <div className='w-full flex justify-center'>
            <div className='w-5/6 flex flex-wrap justify-center md:justify-normal'>
              {
                info.map((item, index) => {
                  return (
                    <CardProduct key={index} url={item.url} name={item.name} product_id={item.product_id} link={link} price={item.price}></CardProduct>
                  )
                })
              }
            </div>
          </div>
      }

    </div>
  )
}
