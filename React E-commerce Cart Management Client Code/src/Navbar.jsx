import { ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router'
import { useContext, useState, useRef, useEffect } from 'react'
import { UserContext } from './context/UserContext'

export function Navbar(props) {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <nav className="bg-gray-800 text-white px-7 py-1 fixed w-full flex justify-between items-center shadow-md z-50">
            <Link to={"/"} className="flex items-center gap-1">
                <img className="w-10 rounded-full" src="/logo.webp" alt="Logo" />
                <p className="font-semibold text-xl">KAZ Store</p>
            </Link>
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="flex items-center gap-1 font-semibold"
                            onClick={toggleDropdown}
                        >
                            <span>{user.name}</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-36 bg-white text-gray-800 rounded shadow-lg z-50">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        navigate('/profile');
                                        setDropdownOpen(false);
                                    }}
                                >
                                    Profile
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        navigate('/orders');
                                        setDropdownOpen(false);
                                    }}
                                >
                                    Orders
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        logout();
                                        setDropdownOpen(false);
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-semibold">Login</Link>
                        <Link to="/register" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold">Sign Up</Link>
                    </>
                )}
                <button
                    type="button"
                    className="relative"
                    onClick={() => props.setModalState(true)}
                    aria-label="Open cart modal"
                >
                    <ShoppingCartIcon className="w-11 h-11" />
                    <span className='absolute top-1.75 right-3.25 text-[#52FFFF] font-bold text-sm'>{props.cart.length}</span>
                </button>
            </div>
        </nav>
    )
}