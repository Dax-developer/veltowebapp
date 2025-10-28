import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { products, getProductsByCategory, sortProducts, searchProducts } from '../utils/productsData';

const PageContainer = styled.div`
  padding: 30px 0;
`;

const PageTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProductCount = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: normal;
`;

const NoProducts = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #666;
`;

const FiltersSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const SearchBar = styled.div`
  position: relative;
  
  input {
    padding: 8px 12px 8px 35px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 250px;
    
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  
  i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
  }
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 15px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover, &.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
`;

const ProductListing = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [filterPrice, setFilterPrice] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    let result = category ? getProductsByCategory(category) : products;
    
    // Limit to 5 products for gifts and toys categories
    if (category === 'gifts' || category === 'toys') {
      result = result.slice(0, 5);
    }
    
    // Apply search
    if (searchQuery) {
      result = searchProducts(searchQuery);
      if (category) {
        result = result.filter(p => p.category === category);
      }
      // Re-apply the 5 product limit after search
      if (category === 'gifts' || category === 'toys') {
        result = result.slice(0, 5);
      }
    }
    
    // Apply price filter
    if (filterPrice !== 'all') {
      const [min, max] = filterPrice.split('-').map(Number);
      if (max) {
        result = result.filter(p => p.price >= min && p.price <= max);
      } else {
        result = result.filter(p => p.price >= min);
      }
      // Re-apply the 5 product limit after filtering
      if (category === 'gifts' || category === 'toys') {
        result = result.slice(0, 5);
      }
    }
    
    // Apply sorting
    result = sortProducts(result, sortBy);
    
    // Final application of the 5 product limit
    if (category === 'gifts' || category === 'toys') {
      result = result.slice(0, 5);
    }
    
    setFilteredProducts(result);
  }, [category, sortBy, filterPrice, searchQuery]);
  
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
          <ProductCount>
            {category === 'gifts' || category === 'toys' 
              ? Math.min(filteredProducts.length, 5) + ' products (limited display)'
              : filteredProducts.length + ' products'}
          </ProductCount>
        </PageTitle>
        
        <FiltersSection>
          <FilterGroup>
            <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest Arrivals</option>
            </FilterSelect>
            
            <FilterSelect value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
              <option value="all">All Prices</option>
              <option value="0-100">Under ₹100</option>
              <option value="100-500">₹100 - ₹500</option>
              <option value="500-1000">₹500 - ₹1,000</option>
              <option value="1000-5000">₹1,000 - ₹5,000</option>
              <option value="5000-10000">₹5,000 - ₹10,000</option>
              <option value="10000-50000">₹10,000 - ₹50,000</option>
              <option value="50000+">Over ₹50,000</option>
            </FilterSelect>
          </FilterGroup>
          
          <SearchBar>
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
        </FiltersSection>
        
        <ProductsGrid>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <NoProducts>No products found matching your criteria.</NoProducts>
          )}
        </ProductsGrid>
        
        {(category !== 'gifts' && category !== 'toys') && (
          <Pagination>
            <PageButton className="active">1</PageButton>
            <PageButton>2</PageButton>
            <PageButton>3</PageButton>
            <PageButton>Next</PageButton>
          </Pagination>
        )}
      </div>
    </PageContainer>
  );
};

export default ProductListing;