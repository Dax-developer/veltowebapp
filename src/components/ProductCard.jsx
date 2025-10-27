import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../utils/CartContext';
import { formatCurrency } from '../utils/currency';

const Card = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const ProductImage = styled.div`
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover img {
    transform: scale(1.15) rotate(2deg);
  }
`;

const DiscountBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #ff4d4d 0%, #f93838 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(255, 77, 77, 0.4);
  z-index: 2;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  height: 40px;
  overflow: hidden;
`;

const Rating = styled.div`
  color: #ffc107;
  margin-bottom: 10px;
  font-size: 14px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const CurrentPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ isInWishlist }) => (isInWishlist ? '#ff4d4d' : '#666')};
  z-index: 2;
  
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    background-color: ${({ isInWishlist }) => (isInWishlist ? '#ff4d4d' : 'white')};
    color: ${({ isInWishlist }) => (isInWishlist ? 'white' : '#ff4d4d')};
  }
  
  i {
    font-size: 18px;
    transition: transform 0.3s ease;
  }
  
  &:hover i {
    transform: scale(1.2);
  }
`;

const Notification = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
  z-index: 10;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  
  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };
  
  return (
    <Card>
      <ProductImage>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </ProductImage>
      
      {product.discount && (
        <DiscountBadge>-{product.discount}%</DiscountBadge>
      )}
      
      <ProductInfo>
        <ProductName>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </ProductName>
        
        <Rating>
          {renderRating(product.rating)}
          <span> ({product.rating})</span>
        </Rating>
        
        <PriceContainer>
          <CurrentPrice>{formatCurrency(product.price)}</CurrentPrice>
          {product.originalPrice && (
            <OriginalPrice>{formatCurrency(product.originalPrice)}</OriginalPrice>
          )}
        </PriceContainer>
        
        <AddToCartButton onClick={handleAddToCart}>
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </AddToCartButton>
        <WishlistButton onClick={handleWishlistToggle} isInWishlist={isInWishlist(product.id)}>
          <i className={isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
        </WishlistButton>
        {showNotification && <Notification>Added to cart!</Notification>}
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;