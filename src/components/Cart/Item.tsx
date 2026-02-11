"use client"
import { useEffect, useState } from 'react'

export interface catInfo {
    url: string,
    name: string,
    price: number,
    amount: number,
    product_id: number
}

export interface dataInfo {
    url: string,
    name: string,
    price: number,
    product_id: number,
}


type storage = {
    id: string,
    amount: string
}

export default function Item() {
    const [info, setInfo] = useState<catInfo[]>([])

    useEffect(() => {
        async function loadCart() {
            const tmp: catInfo[] = [];
            for (let index = 0; index < localStorage.length; index++) {
                const key = localStorage.key(index);
                if(!key) continue;
                const amountStr = localStorage.getItem(key);
                const amount = amountStr ? Number(amountStr) : 1;
                const selected = await loadData(Number(key));
                const newCart: catInfo = {
                    url: selected ? selected.url : "",
                    name: selected ? selected.name : "",
                    price: selected ? selected.price : -1,
                    amount: amount,
                    product_id: selected ? selected.product_id : -1
                };
                tmp.push(newCart);
            }
            setInfo(tmp);
        }
        loadCart();
    }, []);

    async function loadData(id: number): Promise<catInfo | null> {
        try {
            const response = await fetch(`https://shopbackend-production-df00.up.railway.app/product/${id}`);
            if (!response.ok) return null;
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    function ButtonHandler(index: number, amount: number) {
        let tmp = [...info]
        const ID = tmp[index].product_id
        tmp[index].amount += amount
        if (tmp[index].amount == 0) {
            localStorage.removeItem(`${ID}`)
            tmp = tmp.filter((value, i) => i != index)

        } else {
            localStorage.setItem(`${tmp[index].product_id}`, `${tmp[index].amount}`)
        }
        setInfo(tmp)
    }

    function CalculateTotal(): number {
        let total = 0
        for (let index = 0; index < info.length; index++) {
            total += info[index].price * info[index].amount
        }
        return total
    }
    return (
        <div className='w-full lg:w-2/3 rounded-lg shadow-md bg-white shadow-gray-500 py-5 px-4 '>
            <div className=' font-bold text-xl'>
                Your items
            </div>
            <div className='w-full bg-gray-100 flex my-3 rounded-sm px-3 py-1 '>
                <div className='w-2/4 font-bold '>Products</div>
                <div className='w-1/4 font-bold '>Amount</div>
                <div className='w-1/4 font-bold px-3'>Price</div>
            </div>
            <div className='min-h-60 max-h-96 overflow-y-scroll '>
                {info.length > 0 ?
                    info.map((item, index) => {
                        return (
                            <div key={item.product_id} className='w-full flex my-4 border-b-2'>
                                <div className='w-2/4 '>
                                    <div className='w-full'>
                                        <div className='rounded-md w-11/12 lg:w-3/4 border'>
                                            <img src={item.url} className='rounded-md ' />
                                        </div>
                                    </div>
                                    <div className='font-bold text-sm my-2 px-1'>{item.name}</div>
                                </div>
                                <div className='w-1/4 font-bold flex flex-col-reverse justify-center items-center gap-x-1 px-5 md:flex-row md:justify-normal '>
                                    <button className="bg-gray-200 rounded-sm px-3 py-1 text-xs" onClick={() => ButtonHandler(index, -1)}>-</button>
                                    <div>{item.amount}</div>
                                    <button className="bg-gray-200 rounded-sm px-3 py-1 text-xs" onClick={() => ButtonHandler(index, 1)}>+</button>

                                </div>
                                <div className='w-1/4 flex items-center px-5'>
                                    <div className='w-full font-bold '>{item.price}$</div>
                                </div>
                            </div>
                        )
                    }) : ""
                }
                <div className='w-full flex my-4 border-b-2'>
                    <div className='w-3/4 '>
                        <div className='font-bold text-sm my-2 px-1'>Total Price: </div>
                    </div>

                    <div className='w-1/4 font-bold flex items-center'>{CalculateTotal()}$</div>
                </div>

            </div>
        </div>
    )
}
