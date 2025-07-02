import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, token } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Calculate total whenever cart changes
  useEffect(() => {
    const totalValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(parseFloat(totalValue.toFixed(2)));
  }, [cart]);

  // Sync cart to DB when cart changes and user is logged in
  useEffect(() => {
    if (user && token) {
      axios.post(`${import.meta.env.VITE_SERVER_URL}/user-cart`, { cart }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  }, [cart, user, token]);

  return (
    <CartContext.Provider value={{ cart, setCart, total, setTotal }}>
      {children}
    </CartContext.Provider>
  );
}