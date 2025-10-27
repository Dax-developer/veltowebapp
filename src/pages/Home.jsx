import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../utils/productsData';
import { useLanguage } from '../utils/LanguageContext';

const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 50px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.2;
    animation: zoomIn 20s ease-in-out infinite alternate;
  }
  
  @keyframes zoomIn {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-30px);
    }
  }
  
  @media (max-width: 768px) {
    min-height: 500px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

const HeroText = styled.div`
  color: white;
  
  .badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 8px 20px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    animation: slideInLeft 0.8s ease;
  }
  
  h1 {
    font-size: 64px;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 20px;
    animation: slideInLeft 1s ease 0.2s both;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    
    .highlight {
      background: linear-gradient(90deg, #fff 0%, #ffd700 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    @media (max-width: 768px) {
      font-size: 42px;
    }
    
    @media (max-width: 480px) {
      font-size: 32px;
    }
  }
  
  p {
    font-size: 20px;
    line-height: 1.6;
    margin-bottom: 40px;
    opacity: 0.95;
    animation: slideInLeft 1s ease 0.4s both;
    
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  animation: slideInLeft 1s ease 0.6s both;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ShopButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 40px;
  background: white;
  color: #667eea;
  border-radius: 50px;
  font-weight: 700;
  font-size: 18px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  }
  
  i {
    font-size: 20px;
    transition: transform 0.3s ease;
  }
  
  &:hover i {
    transform: translateX(5px);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 40px;
  background: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 50px;
  font-weight: 700;
  font-size: 18px;
  transition: all 0.4s ease;
  
  &:hover {
    background: white;
    color: #667eea;
    transform: translateY(-5px);
  }
`;

const HeroImage = styled.div`
  position: relative;
  animation: slideInRight 1s ease 0.4s both;
  
  .main-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.05) rotate(2deg);
    }
  }
  
  .floating-badge {
    position: absolute;
    background: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: floatBadge 3s ease-in-out infinite;
    
    &.badge-1 {
      top: 10%;
      right: -20px;
    }
    
    &.badge-2 {
      bottom: 10%;
      left: -20px;
    }
    
    .badge-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
    
    .badge-text {
      font-size: 14px;
      font-weight: 600;
      color: #667eea;
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes floatBadge {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
  
  @media (max-width: 992px) {
    display: flex;
    justify-content: center;
    
    .main-image {
      max-width: 400px;
    }
    
    .floating-badge {
      display: none;
    }
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #007bff;
  }
`;

const FeaturedProducts = styled.section`
  padding: 50px 0;
  background-color: #f8f9fa;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CategoriesSection = styled.section`
  padding: 50px 0;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  h3 {
    padding: 15px;
    text-align: center;
    font-size: 20px;
  }
`;

const Home = () => {
  const { t } = useLanguage();
  
  // Get featured products (first 8 products with highest ratings)
  const featuredProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);
  
  // Category data with images
  const categoryData = [
    {
      id: 1,
      name: t('electronics'),
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80'
    },
    {
      id: 2,
      name: t('fashion'),
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80'
    },
    {
      id: 3,
      name: t('homeKitchen'),
      category: 'home',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80'
    },
    {
      id: 4,
      name: t('beauty'),
      category: 'beauty',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80'
    }
  ];
  
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <div className="badge">🎉 {t('specialOffer')}</div>
            <h1>
              {t('getBestDeals')} <span className="highlight">{t('bestDeals')}</span><br />
              {t('everySingleDay')}
            </h1>
            <p>
              {t('heroDescription')}
            </p>
            <HeroButtons>
              <ShopButton to="/products">
                {t('shopNow')} <i className="fas fa-arrow-right"></i>
              </ShopButton>
              <SecondaryButton to="/products">
                {t('viewDeals')} <i className="fas fa-fire"></i>
              </SecondaryButton>
            </HeroButtons>
          </HeroText>
          
          <HeroImage>
            <img 
              className="main-image"
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80" 
              alt="Shopping"
            />
            <div className="floating-badge badge-1">
              <div className="badge-icon">🎁</div>
              <div className="badge-text">{t('freeShipping')}</div>
            </div>
            <div className="floating-badge badge-2">
              <div className="badge-icon">⚡</div>
              <div className="badge-text">{t('flashSale')}</div>
            </div>
          </HeroImage>
        </HeroContent>
      </HeroSection>
      
      <CategoriesSection>
        <div className="container">
          <SectionTitle>{t('shopByCategory')}</SectionTitle>
          <CategoriesGrid>
            {categoryData.map(category => (
              <Link to={`/products/${category.category}`} key={category.id} style={{ textDecoration: 'none' }}>
                <CategoryCard>
                  <img src={category.image} alt={category.name} />
                  <h3>{category.name}</h3>
                </CategoryCard>
              </Link>
            ))}
          </CategoriesGrid>
        </div>
      </CategoriesSection>
      
      <FeaturedProducts>
        <div className="container">
          <SectionTitle>{t('featuredProducts')}</SectionTitle>
          <ProductsGrid>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsGrid>
        </div>
      </FeaturedProducts>
    </>
  );
};

export default Home;