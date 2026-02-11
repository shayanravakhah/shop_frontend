"use client"
import { useEffect, useState } from 'react'
import CardList from './CardList'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export interface catInfo {
    url: string,
    name: string,
    id: number
}

export default function Categories() {
    const [info, setInfo] = useState<catInfo[]>([])
    useEffect(() => {
        fetch("https://shopbackend-production-df00.up.railway.app/category")
            .then(response => response.json())
            .then(data => {
                setInfo(data)
            });
    }, [])

    return (
        <div className='w-full h-full '>
            <div className='w-full flex justify-center mt-16 py-4 text-2xl font-semibold'>Categories</div>
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
                                        <CardList key={index} url={item.url} name={item.name} id={item.id}></CardList>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
