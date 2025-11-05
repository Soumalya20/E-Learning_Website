import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (course) => {
    setItems((prev) => {
      if (prev.some((c) => c._id === course._id)) return prev; // no duplicates
      return [...prev, { _id: course._id, title: course.title, price: course.price, thumbnail: course.thumbnail }];
    });
  };

  const removeItem = (courseId) => {
    setItems((prev) => prev.filter((c) => c._id !== courseId));
  };

  const clear = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, c) => sum + (Number(c.price) || 0), 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, total }}>
      {children}
    </CartContext.Provider>
  );
};


