import { useState, useContext } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router'
import axios from 'axios';
import { CartContext } from './context/CartContext';

export function Cart(props) {
    const { setCart } = useContext(CartContext);
    const [address, setAddress] = useState('');

    const handlePlaceOrder = async () => {
        if (!address.trim()) {
            alert("Please enter your delivery address.");
            return;
        }
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/place-order`,
                { cart: props.cart, total: props.total, address },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            alert("Order placed successfully! Order ID: " + response.data.orderId);
            setCart([]);
        } catch (err) {
            alert("Order failed: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className=" flex flex-col md:flex-row gap-2">
            <div className="bg-white px-4 py-2 rounded-lg shadow-gray-400 shadow-md w-full md:w-35/50">
                <h2 className='text-2xl font-bold mb-4'><u>Shopping Cart ({props.cart.length})</u></h2>
                {props.cart.length === 0 ? (
                    <p className='text-center text-gray-500'>Your Cart is Empty</p>
                ) : (
                    <>
                        {props.cart.map((item) => (
                            <div key={item.id} className='flex justify-between items-center border-b py-2'>
                                <div className='flex items-center space-x-4'>
                                    <img src={item.image} alt={item.title} className='max-h-20 w-20 object-contain' />
                                    <div>
                                        <h3 className='font-semibold line-clamp-1' title={item.title}>{item.title}</h3>
                                        <div className='flex gap-x-0.5 items-center'>
                                            <span className='text-gray-600 px-1'>₹{item.price} x </span>
                                            <button onClick={() => props.decreaseQuantity(item)} className="bg-gray-200 hover:bg-gray-300 rounded-xs">
                                                <MinusIcon className='w-5 h-5' />
                                            </button>
                                            <span className='px-1'>{item.quantity}</span>
                                            <button onClick={() => props.increaseQuantity(item)} className="bg-gray-200 hover:bg-gray-300 rounded-xs">
                                                <PlusIcon className='w-5 h-5' />
                                            </button>
                                            <button onClick={() => props.removeCart(item)} className='text-red-500 hover:text-red-700 mx-5'>Remove</button>
                                        </div>
                                    </div>
                                </div>
                                <div>₹{item.price * item.quantity}</div>
                            </div>
                        ))}
                    </>
                )}
                <Link to='/'><p className='text-center font-bold text-lg my-4'>Continue Shopping</p></Link>
            </div>
            <div className="bg-white flex flex-col gap-2 px-4 py-2 rounded-b-xs md:fixed shadow-gray-400 shadow-md top-16 right-4 h-fit md:w-14/50">
                <h1 className="text-gray-500 py-2 font-bold">PRICE DETAILS</h1>
                <hr className="border-gray-300 !px-0" />
                <div className="flex justify-between">
                    <span>Price ({props.cart.length} items)</span><span>₹{props.total}</span>
                </div>
                <div className="flex justify-between">
                    <span>Discount 10% </span><span>-₹{(props.total * 0.1).toFixed(2)}</span>
                </div>
                <hr className="border-t border-dotted border-gray-600 border-2" />
                <div className='mt-2 mb-2 flex justify-between font-bold'>
                    <span>Total Amount:</span>
                    <span>₹{(props.total * 0.9).toFixed(2)}</span>
                </div>
                <hr className="border-t border-dotted border-gray-600 border-2 mb-2" />
                {/* Address Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-semibold">Delivery Address</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows={3}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Enter your delivery address"
                        required
                    />
                </div>
                <button
                    className='w-full mb-4 bg-green-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-600'
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </button>
            </div>
        </div>
    )
}