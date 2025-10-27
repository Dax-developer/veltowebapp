import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add item to cart
  const addToCart = (product, selectedOptions = {}) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => 
          item.id === product.id &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );

      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // New item, add to cart
        return [...prevCart, {
          ...product,
          quantity: 1,
          selectedOptions
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id, selectedOptions = {}) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
      )
    );
  };

  // Update item quantity
  const updateQuantity = (id, selectedOptions, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, selectedOptions);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.find(item => item.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
