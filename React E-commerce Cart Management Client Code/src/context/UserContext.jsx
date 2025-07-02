import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  // Fetch user details if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${import.meta.env.VITE_SERVER_URL}/user-details`)
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (token, localCart = []) => {
    localStorage.setItem('token', token);
    setToken(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user-details`);
    setUser(response.data);

    // Fetch cart from DB
    const dbCartRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user-cart`);
    let dbCart = dbCartRes.data.cart || [];

    let mergedCart = [];

    if (localCart.length > 0) {
      // Merge localCart and dbCart (by product id, sum quantities)
      mergedCart = [...dbCart];
      localCart.forEach(localItem => {
        const dbItem = mergedCart.find(item => item.id === localItem.id);
        if (dbItem) {
          dbItem.quantity += localItem.quantity;
        } else {
          mergedCart.push(localItem);
        }
      });
      // Save merged cart to DB
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/user-cart`, { cart: mergedCart });
    } else {
      // If local cart is empty, use DB cart as is
      mergedCart = dbCart;
    }

    // Return mergedCart so LoginPage can set it in state
    return mergedCart;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
};

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}