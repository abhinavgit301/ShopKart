import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext();
const WISHLIST_KEY = 'shopkart_wishlist';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product) => {
    setItems((current) => {
      if (current.some((item) => item.id === product.id)) return current;
      return [...current, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    const exists = items.some((item) => item.id === product.id);
    if (exists) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const value = useMemo(
    () => ({
      items,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      totalItems: items.length,
    }),
    [items],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider');
  return context;
}
