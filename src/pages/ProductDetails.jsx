import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getProductById } from '../utils/productsData';
import { useCart } from '../utils/CartContext';
import { formatCurrency } from '../utils/currency';

const PageContainer = styled.div`
  padding: 30px 0;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainImage = styled.div`
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const WishlistIconButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  color: ${({ isInWishlist }) => (isInWishlist ? '#ff4d4d' : '#666')};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
  
  i {
    font-size: 20px;
  }
`;

const CartNotification = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #28a745;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
  z-index: 1000;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const NoProduct = styled.div`
  text-align: center;
  padding: 100px 20px;
  font-size: 24px;
  color: #666;
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 15px;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${({ active }) => (active ? '#007bff' : 'transparent')};
  transition: border-color 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    border-color: #007bff;
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  
  .rating-stars {
    color: #ffc107;
  }
  
  .rating-value {
    font-weight: 500;
  }
  
  .reviews-link {
    color: #007bff;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const CurrentPrice = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: #007bff;
`;

const OriginalPrice = styled.span`
  font-size: 20px;
  color: #999;
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

const ProductDescription = styled.div`
  margin-bottom: 30px;
  
  p {
    color: #666;
    line-height: 1.8;
  }
`;

const ProductOptions = styled.div`
  margin-bottom: 30px;
`;

const OptionGroup = styled.div`
  margin-bottom: 20px;
  
  h3 {
    margin-bottom: 10px;
    font-size: 18px;
  }
`;

const OptionButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const OptionButton = styled.button`
  padding: 8px 15px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover, &.selected {
    border-color: #007bff;
    background-color: #007bff;
    color: white;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  
  h3 {
    font-size: 18px;
  }
`;

const QuantityButtons = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const QuantityDisplay = styled.span`
  width: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
  
  .add-to-cart {
    flex: 2;
    padding: 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: #0056b3;
    }
  }
  
  .buy-now {
    flex: 1;
    padding: 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: #1e7e34;
    }
  }
`;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();
  const product = getProductById(id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  
  if (!product) {
    return (
      <PageContainer>
        <div className="container">
          <NoProduct>Product not found</NoProduct>
        </div>
      </PageContainer>
    );
  }
  
  // Set defaults
  if (!selectedColor && product.colors && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }
  if (!selectedSize && product.sizes && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }
  
  // Generate product images (use main image + variations)
  const productImages = [
    product.image,
    product.image,
    product.image
  ];
  
  const handleAddToCart = () => {
    const selectedOptions = {
      color: selectedColor,
      size: selectedSize
    };
    addToCart(product, selectedOptions);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };
  
  const handleBuyNow = () => {
    const selectedOptions = {
      color: selectedColor,
      size: selectedSize
    };
    addToCart(product, selectedOptions);
    navigate('/cart');
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
  
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  return (
    <PageContainer>
      <div className="container">
        <ProductContainer>
          <ProductImages>
            <MainImage>
              <img src={productImages[selectedImage]} alt={product.name} />
              <WishlistIconButton onClick={handleWishlistToggle} isInWishlist={isInWishlist(product.id)}>
                <i className={isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
              </WishlistIconButton>
            </MainImage>
            <Thumbnails>
              {productImages.map((image, index) => (
                <Thumbnail
                  key={index}
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`Product ${index + 1}`} />
                </Thumbnail>
              ))}
            </Thumbnails>
          </ProductImages>
          
          <ProductInfo>
            <ProductTitle>{product.name}</ProductTitle>
            
            <ProductRating>
              <div className="rating-stars">
                {renderRating(product.rating)}
              </div>
              <span className="rating-value">{product.rating}</span>
              <span>({product.reviewCount || 0} reviews)</span>
              <span className="reviews-link">Write a review</span>
            </ProductRating>
            
            <ProductPrice>
              <CurrentPrice>{formatCurrency(product.price)}</CurrentPrice>
              <OriginalPrice>{formatCurrency(product.originalPrice)}</OriginalPrice>
              <DiscountBadge>-{product.discount}%</DiscountBadge>
            </ProductPrice>
            
            <ProductDescription>
              <p>{product.description}</p>
            </ProductDescription>
            
            <ProductOptions>
              {product.colors && product.colors.length > 0 && (
                <OptionGroup>
                  <h3>Color</h3>
                  <OptionButtons>
                    {product.colors.map((color) => (
                      <OptionButton
                        key={color}
                        className={selectedColor === color ? 'selected' : ''}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </OptionButton>
                    ))}
                  </OptionButtons>
                </OptionGroup>
              )}
              
              {product.sizes && product.sizes.length > 0 && (
                <OptionGroup>
                  <h3>Size</h3>
                  <OptionButtons>
                    {product.sizes.map((size) => (
                      <OptionButton
                        key={size}
                        className={selectedSize === size ? 'selected' : ''}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </OptionButton>
                    ))}
                  </OptionButtons>
                </OptionGroup>
              )}
            </ProductOptions>
            
            <QuantitySelector>
              <h3>Quantity</h3>
              <QuantityButtons>
                <QuantityButton onClick={() => handleQuantityChange(-1)}>-</QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantityChange(1)}>+</QuantityButton>
              </QuantityButtons>
            </QuantitySelector>
            
            <ActionButtons>
              <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
              <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
            </ActionButtons>
            
            {showNotification && <CartNotification>Added to cart!</CartNotification>}
          </ProductInfo>
        </ProductContainer>
      </div>
    </PageContainer>
  );
};

export default ProductDetails;