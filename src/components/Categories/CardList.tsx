import { catInfo } from './Categories'
import Link from 'next/link'

export default function CardList({ url, name , id  }: catInfo) {
    return (
        <div className='w-full sm:w-1/2 lg:w-1/3  py-3 px-2'>
            <Link href={`/products/${name}(${id})`} className='w-full'>
                <div className=' w-full bg-white border rounded-lg shadow-md shadow-[#8a8a8a] md:hover:bg-green-100 md:hover:scale-110 md:transition-all md:duration-200'>
                    <div className='py-1 px-1'>
                        <img src={url} className='rounded-lg h-96 xl:h-72 w-full object-cover' />
                    </div>
                    <div className='w-full px-2 py-3 text-center text-lg font-semibold'>{name}</div>
                </div>
            </Link>
        </div>
    )
}
