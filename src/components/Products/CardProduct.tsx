import Link from 'next/link'
import AddCardIcon from '@mui/icons-material/AddCard';

interface productInfo {
    url: string,
    name: string,
    link: string,
    product_id: number,
    price: number
}

export default function CardProduct({ url, name, link, product_id, price }: productInfo) {

    async function SetStorage() {
        if (!localStorage.getItem(`${product_id}`)) {
            localStorage.setItem(`${product_id}`, "1")
            alert("The product was added to the cart")
        }
        else {
            alert("You already select this products")
        }
    }
    return (
        <div className='w-full sm:w-1/2 lg:w-1/3 py-3 px-2  md:hover:scale-110 md:transition-all md:duration-200'>
            <Link href={`/products/${link}/${product_id}`} className='w-full '>
                <div className=' w-full bg-white border rounded-lg shadow-md shadow-[#8a8a8a] md:hover:bg-green-100  md:transition-all md:duration-200'>
                    <div className='py-1 px-1'>
                        <img src={url} className='rounded-lg h-96 xl:h-96 w-full object-cover ' />
                    </div>
                    <div className='w-full flex flex-col px-2 py-3'>
                        <div className='w-full px-2 py-3 text-lg font-semibold'>{name}</div>
                        <div className='flex justify-between'>
                            <div>{price}$</div>
                            <button className='flex gap-2 py-1 px-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-800 shadow-gray-400' onClick={SetStorage}>
                                <AddCardIcon></AddCardIcon>
                                <p>Add item</p>
                            </button>                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
