"use client"
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';

export default function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className='flex justify-center w-full bg-green-500 z-10 fixed top-0 py-7'>
            <div className='hidden justify-center md:flex gap-10 w-5/6  '>
                <Link href={"/"} >
                    <div className={`flex gap-1 cursor-pointer`}  >
                        <HomeIcon className='text-white'></HomeIcon>
                        <div className='text-white font-bold text-lg'> Main Menu </div>
                    </div>
                </Link>
                <Link href={"/products"} >
                    <div className={`flex gap-1 cursor-pointer`}  >
                        <ShoppingCartIcon className='text-white'></ShoppingCartIcon>
                        <div className='text-white font-bold text-lg'> Shop </div>
                    </div>
                </Link>
                <Link href={"/cart"}>
                    <div className={`flex gap-1 cursor-pointer`}  >
                        <LocalMallIcon className='text-white'></LocalMallIcon>
                        <div className='text-white font-bold text-lg'> Cart </div>
                    </div>
                </Link>
            </div>
            <div className="flex w-5/6 justify-start md:hidden text-white">
                <MenuIcon className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
                <Drawer
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    slotProps={{
                        paper: {
                            className: 'bg-green-300 w-2/3 py-10',
                        },
                    }}
                >
                    <div className='flex flex-col md:hidden w-full h-full'>
                        <Link href={"/"} onClick={() => setIsOpen(false)} >
                            <div className={`flex cursor-pointer gap-x-3 w-full px-7 py-8 hover:bg-green-600`}  >
                                <HomeIcon className='text-white'></HomeIcon>
                                <div className='text-white font-bold text-lg'> Main Menu </div>
                            </div>
                        </Link>
                        <Link href={"/products"} onClick={() => setIsOpen(false)} >
                            <div className={`flex cursor-pointer gap-x-3 w-full px-7 py-8 hover:bg-green-600`} >
                                <ShoppingCartIcon className='text-white'></ShoppingCartIcon>
                                <div className='text-white font-bold text-lg'> Shop </div>
                            </div>
                        </Link>
                        <Link href={"/cart"} onClick={() => setIsOpen(false)}>
                            <div className={`flex cursor-pointer gap-x-3 w-full px-7 py-8 hover:bg-green-600`} >
                                <LocalMallIcon className='text-white'></LocalMallIcon>
                                <div className='text-white font-bold text-lg'> Cart </div>
                            </div>
                        </Link>
                    </div>
                </Drawer>
            </div>
        </div>
    )
}
