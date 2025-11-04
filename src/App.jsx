import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './utils/CartContext';
import { LanguageProvider } from './utils/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import OrderSummary from './pages/OrderSummary';
import ThankYou from './pages/ThankYou';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import FAQ from './pages/FAQ';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsExchanges from './pages/ReturnsExchanges';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './styles/global.css';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/products/:category" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;