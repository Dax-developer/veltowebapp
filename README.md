# Velto - Modern E-Commerce Web Application

A fully responsive, feature-rich e-commerce web application built with React and Vite.

## 🚀 Features

- **Fully Responsive Design** - Works beautifully on all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean, attractive interface with smooth animations
- **User Authentication** - Login/Signup with localStorage integration
- **Shopping Cart** - Add, remove, and manage products
- **Product Catalog** - Browse products by categories
- **Checkout System** - Complete order processing
- **Order Management** - Track orders in user profile
- **Wishlist** - Save favorite products
- **User Profile** - Manage account, addresses, and reviews
- **Multi-language Support** - Translation system (currently English)

## 🛠️ Tech Stack

- **React 19.2.0** - Modern UI library
- **Vite 7.1.12** - Fast build tool with HMR
- **React Router DOM 7.9.4** - Client-side routing
- **Styled Components 6.1.19** - CSS-in-JS styling
- **Context API** - State management for cart and language
- **localStorage** - Client-side data persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/veltowebapp.git
cd veltowebapp
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## 🏗️ Project Structure

```
ecommerce-frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Logo.jsx
│   │   └── ProductCard.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── ProductListing.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   └── Contact.jsx
│   ├── utils/           # Utility functions
│   │   ├── CartContext.jsx
│   │   ├── LanguageContext.jsx
│   │   ├── currency.js
│   │   └── productsData.js
│   ├── styles/          # Global styles
│   │   ├── global.css
│   │   └── reset.css
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Features in Detail

### Responsive Design
- Desktop Large (1920px+)
- Desktop Standard (1200px - 1919px)
- Laptop (1024px - 1199px)
- Tablet Landscape (768px - 1023px)
- Tablet Portrait (600px - 767px)
- Mobile Large (480px - 599px)
- Mobile Small (320px - 479px)

### User Features
- ✅ User registration and login
- ✅ Profile management
- ✅ Order history
- ✅ Address management
- ✅ Product reviews
- ✅ Wishlist functionality

### Shopping Features
- ✅ Product browsing by category
- ✅ Product search and filtering
- ✅ Shopping cart with quantity management
- ✅ Secure checkout process
- ✅ Order tracking
- ✅ Multiple payment method support

## 💻 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

- Touch-optimized UI elements
- Minimum touch target size: 44px
- Responsive images
- Adaptive layouts
- Optimized performance

## 🎯 Currency

All prices displayed in Indian Rupees (₹)

## 👨‍💻 Developer

**Dax Patel** - Full-Stack Developer

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Built with ❤️ by Dax Patel
