import { StarIcon } from '@heroicons/react/24/solid'

import { useParams } from 'react-router';

export function ProductFull(props) {

    const { id } = useParams();
    const product = props.products.find((product) => product.id === parseInt(id));
    return (
        <div className='flex flex-col md:flex-row gap-4 m-3'>
            <img className='w-full md:w-xs' src={product.image} alt={product.title} />
            <div>
                <a href='#' className='text-xl'>{product.category}</a>
                <h1 className='font-bold text-3xl pb-3'>{product.title}</h1>
                <div className="flex items-center gap-3">
                    <span className={`flex items-center px-1 rounded text-white ${getRatingColor(product.rating.rate)}`}>
                        {product.rating.rate}
                        <StarIcon className="size-7 text-white" />
                    </span>
                    <span className='text-lg'>({product.rating.count} Reviews)</span>
                </div>
                <p className='my-2 font-bold text-2xl'>₹{product.price}</p>
                <p className='text-lg'>Description: {product.description}</p>
                <button onClick={() => { props.addToCart(product) }} className='w-fit mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>Add to cart</button>
            </div>
        </div>
    );
}

function getRatingColor(rating) {
    if (rating >= 4) {
        return 'bg-green-600';
    } else if (rating >= 2) {
        return 'bg-yellow-600';
    } else {
        return 'bg-red-600';
    }
}