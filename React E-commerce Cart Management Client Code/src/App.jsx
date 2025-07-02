import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ProductCard } from './ProductCard';
import { Navbar } from './Navbar';
import { CartModal } from './CartModal';
import { Cart } from './Cart';
import { ProductFull } from './ProductFull';
import LoginPage from './user/LoginPage';
import RegisterPage from './user/RegisterPage';
import ForgotPasswordPage from './user/ForgotPasswordPage';
import VerifyAccountPage from './user/VerifyAccountPage';
import ResetPasswordPage from './user/ResetPasswordPage';
import ProfilePage from './user/ProfilePage';
import OrdersPage from './user/OrdersPage';
import { UserProvider, UserContext } from './context/UserContext';
import { CartContext } from './context/CartContext';
import './App.css';
import axios from 'axios';

function App() {
  const { cart, setCart, total } = useContext(CartContext);
  const { user, token } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [modalState, setModalState] = useState(false);

  let fetchProducts = async () => {
    const productsData = await fetch('https://fakestoreapi.com/products')
    const productResponse = await productsData.json()
    setProducts(productResponse)
  }

  let addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    setCart([...cart]);
  };

  let removeCart = (product) => {
    cart.splice(cart.indexOf(product), 1)
    setCart([...cart])
  }

  let increaseQuantity = (product) => {
    const index = cart.indexOf(product);
    cart[index].quantity += 1;
    setCart([...cart]);
  };
  
  let decreaseQuantity = (product) => {
    const index = cart.indexOf(product);
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      setCart([...cart]);
    }
  };

  // Sync cart to DB when cart changes and user is logged in
  useEffect(() => {
    if (user && token) {
      axios.post(`${import.meta.env.VITE_SERVER_URL}/user-cart`, { cart }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  }, [cart, user, token]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='min-h-screen bg-gray-200'>
      <BrowserRouter>
        <Navbar cart={cart} setModalState={setModalState} />
        <div className='container mx-auto px-4 py-16'>
          <Routes>
            <Route path="/login" element={<LoginPage cart={cart} setCart={setCart} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-account/:token" element={<VerifyAccountPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            {/* Existing routes */}
            <Route index element={<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5'>
              {products.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
            </div>} />
            <Route path="/cart" element={<Cart cart={cart} total={total} setModalState={setModalState} removeCart={removeCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />} />
            <Route path="product/:id" element={<ProductFull products={products} addToCart={addToCart}/>} />
          </Routes>
        </div>
        {modalState && (<CartModal cart={cart} total={total} setModalState={setModalState} removeCart={removeCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />)}
      </BrowserRouter>
    </div>
  );
}

export default App;
