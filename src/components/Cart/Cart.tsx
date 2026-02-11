import Item from './Item'
import Info from './Info'

export default function cart() {
    return (
        <div className='w-full flex justify-center '>
            <div className='w-full flex flex-wrap justify-center px-5 gap-y-7 sm:px-0 sm:w-5/6 lg:flex-nowrap  lg:gap-y-0 lg:gap-x-5 '>
                <Item></Item>
                <Info></Info>
            </div>
        </div>
    )
}
