import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    home: 'Home',
    products: 'Products',
    myAccount: 'My Account',
    contact: 'Contact',
    
    // Hero Section
    specialOffer: 'SPECIAL OFFER - LIMITED TIME',
    getBestDeals: 'Get',
    bestDeals: 'Best Deals',
    everySingleDay: 'Every Single Day!',
    heroDescription: 'Discover amazing products at unbeatable prices. Shop the latest trends and enjoy exclusive discounts up to 70% off!',
    shopNow: 'Shop Now',
    viewDeals: 'View Deals',
    freeShipping: 'Free Shipping',
    flashSale: 'Flash Sale',
    
    // Categories
    shopByCategory: 'Shop By Category',
    electronics: 'Electronics',
    fashion: 'Fashion',
    homeKitchen: 'Home & Kitchen',
    beauty: 'Beauty',
    books: 'Books',
    toys: 'Toys & Games',
    gifts: 'Gifts',
    automotive: 'Automotive',
    
    // Products
    featuredProducts: 'Featured Products',
    addToCart: 'Add to Cart',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    cartEmptyDesc: "Looks like you haven't added anything to your cart yet",
    continueShopping: 'Continue Shopping',
    remove: 'Remove',
    quantity: 'Quantity',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    
    // Footer
    brandDesc: 'Your one-stop destination for all your shopping needs. Quality products at affordable prices.',
    quickLinks: 'Quick Links',
    customerService: 'Customer Service',
    contactUs: 'Contact Us',
    faqs: 'FAQs',
    shippingPolicy: 'Shipping Policy',
    returnsExchanges: 'Returns & Exchanges',
    privacyPolicy: 'Privacy Policy',
    newsletter: 'Newsletter',
    newsletterDesc: 'Subscribe to our newsletter for the latest updates and offers.',
    yourEmail: 'Your Email Address',
    subscribe: 'Subscribe',
    allRightsReserved: 'All Rights Reserved',
    
    // Login
    welcomeBack: 'Welcome Back!',
    loginToContinue: 'Login to continue shopping',
    emailAddress: 'Email Address',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot Password?',
    signIn: 'Sign In',
    dontHaveAccount: "Don't have an account?",
    signUp: 'Sign Up',
    
    // Profile
    profile: 'Profile',
    myOrders: 'My Orders',
    addresses: 'Addresses',
    wishlist: 'Wishlist',
    myReviews: 'My Reviews',
    settings: 'Settings',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
