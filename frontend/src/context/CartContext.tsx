import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  total: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const { user } = useAuth();

  const loadCart = async () => {
    if (!user) {
      setCart([]);
      setTotal(0);
      return;
    }

    // Mock cart data
    const mockCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(mockCart);
    const cartTotal = mockCart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    setTotal(cartTotal);
  };

  const addToCart = async (productId: string, quantity = 1) => {
    if (!user) return;

    // Mock products for demo
    const mockProducts = [
      {
        _id: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 199.99,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500'
      },
      {
        _id: '2',
        name: 'Smartphone 12 Pro',
        price: 999.99,
        image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500'
      }
    ];

    const product = mockProducts.find(p => p._id === productId) || mockProducts[0];
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find((item: CartItem) => item.product._id === productId);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map((item: CartItem) => 
        item.product._id === productId 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem = {
        _id: Date.now().toString(),
        product,
        quantity,
        price: product.price
      };
      updatedCart = [...existingCart, newItem];
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    const cartTotal = updatedCart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    setTotal(cartTotal);
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = existingCart.map((item: CartItem) => 
      item._id === itemId ? { ...item, quantity } : item
    );
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    const cartTotal = updatedCart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    setTotal(cartTotal);
  };

  const removeFromCart = async (itemId: string) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = existingCart.filter((item: CartItem) => item._id !== itemId);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    const cartTotal = updatedCart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    setTotal(cartTotal);
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
    setTotal(0);
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  return (
    <CartContext.Provider value={{
      cart,
      total,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};