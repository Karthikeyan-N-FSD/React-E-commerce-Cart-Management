import { StarIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router'

export function ProductCard(props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-150 ease-in">
      <Link to={`/product/${props.product.id}`}><img className="w-full h-48 object-contain rounded-lg mb-3" src={props.product.image} alt={props.product.title} /></Link>
      <div>
        <Link to={`/product/${props.product.id}`}>
          <h3 className="text-lg font-semibold line-clamp-2 mb-1" title={props.product.title}>{props.product.title}</h3>
          <div className='flex justify-between items-center'>
            <div className="text-gray-700 font-medium">₹ {props.product.price}</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">({props.product.rating.count})</span>
              <span className={`flex items-center px-2 py-0.5 rounded-full text-white ${getRatingColor(props.product.rating.rate)}`}>
                {props.product.rating.rate}
                <StarIcon className="size-4 text-white" />
              </span>
            </div>
          </div>
        </Link>
        <button onClick={() => { props.addToCart(props.product) }} className='w-full mt-3 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors duration-150 ease-in'>Add to cart</button>
      </div>
    </div>
  )
}

function getRatingColor(rating) {
  if (rating >= 4) {
    return 'bg-green-600';
  } else if (rating >= 2) {
    return 'bg-yellow-500';
  } else {
    return 'bg-red-500';
  }
}