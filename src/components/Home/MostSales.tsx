"use client"
import { useEffect, useState } from 'react'
import CardSales from './CardSales'
import axios, { AxiosResponse } from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

interface productInfo {
    url: string,
    name: string,
    category_id: number,
    product_id: number,
    category_name: string,
    price: number,
}


export default function MostSales() {
    const [info, setInfo] = useState<productInfo[]>([]);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            const res: AxiosResponse<any, any, {}> = await axios.get("https://shopbackend-production-df00.up.railway.app/most/products")
            setInfo(res.data)
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    return (

        < div className='w-full h-full ' >
            <div className='w-full flex justify-center mt-0 md:mt-16 py-4 text-2xl font-semibold'>Most sales </div>
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
                                        <CardSales key={index} category_name={item.category_name} url={item.url} name={item.name} category_id={item.category_id} product_id={item.product_id} price={item.price}></CardSales>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </div >
    )
}
