import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();

const CART_KEY = 'shopkart_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = product?.colors?.[0] || null) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.id === product.id && item.size === selectedSize && item.color === selectedColor,
      );

      if (existingIndex >= 0) {
        return current.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...current, { ...product, quantity, size: selectedSize, color: selectedColor }];
    });
  };

  const updateQuantity = (id, size, color, change) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id, size, color) => {
    setItems((current) => current.filter((item) => !(item.id === id && item.size === size && item.color === color)));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [items],
  );

  const discount = useMemo(
    () => items.reduce((sum, item) => sum + (Number(item.originalPrice || item.price) - Number(item.price)) * item.quantity, 0),
    [items],
  );

  const shipping = subtotal > 0 ? (subtotal > 8000 ? 0 : 299) : 0;
  const total = subtotal - discount + shipping;

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
