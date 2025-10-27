import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../utils/CartContext';
import { formatCurrency } from '../utils/currency';

const PageContainer = styled.div`
  padding: 30px 0;
`;

const PageTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 28px;
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  
  @media (max-width: 992px) {
    order: 2;
  }
`;

const SidebarItem = styled.div`
  padding: 12px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 5px;
  
  &:hover, &.active {
    background-color: #007bff;
    color: white;
  }
`;

const MainContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  
  @media (max-width: 992px) {
    order: 1;
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #666;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  h2 {
    font-size: 24px;
    margin-bottom: 5px;
  }
  
  p {
    color: #666;
    margin-bottom: 10px;
  }
`;

const EditButton = styled.button`
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const FormSection = styled.div`
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SaveButton = styled.button`
  padding: 12px 25px;
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
`;

const OrderCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const OrderInfo = styled.div`
  h3 {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  p {
    color: #666;
    font-size: 14px;
  }
`;

const OrderStatus = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  
  &.delivered {
    background-color: #d4edda;
    color: #155724;
  }
  
  &.shipped {
    background-color: #cfe2ff;
    color: #084298;
  }
  
  &.processing {
    background-color: #fff3cd;
    color: #856404;
  }
  
  &.cancelled {
    background-color: #f8d7da;
    color: #721c24;
  }
`;

const OrderProducts = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  flex: 1;
  
  h4 {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  p {
    color: #666;
    font-size: 14px;
  }
`;

const AddressCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  
  ${({ isDefault }) => isDefault && `
    border-color: #007bff;
    background-color: #f8f9ff;
  `}
`;

const AddressType = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 4px 12px;
  background-color: #007bff;
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const DefaultBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-top: 10px;
`;

const AddressActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  padding: 8px 15px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
    border-color: #007bff;
    color: #007bff;
  }
  
  &.delete {
    border-color: #dc3545;
    color: #dc3545;
    
    &:hover {
      background-color: #dc3545;
      color: white;
    }
  }
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const WishlistCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const WishlistImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const WishlistInfo = styled.div`
  padding: 15px;
  
  h4 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  p {
    color: #007bff;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

const WishlistActions = styled.div`
  display: flex;
  gap: 10px;
`;

const WishlistButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &.add-to-cart {
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
    }
  }
  
  &.remove {
    background-color: #f8f9fa;
    color: #666;
    border: 1px solid #ddd;
    
    &:hover {
      background-color: #dc3545;
      color: white;
      border-color: #dc3545;
    }
  }
`;

const ReviewCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ReviewHeader = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const ReviewProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ReviewProductInfo = styled.div`
  flex: 1;
  
  h4 {
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
  
  i {
    color: #ffc107;
  }
`;

const ReviewDate = styled.p`
  color: #666;
  font-size: 14px;
`;

const ReviewContent = styled.div`
  margin-top: 15px;
  
  h5 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  p {
    color: #333;
    line-height: 1.6;
  }
`;

const ReviewFooter = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HelpfulButton = styled.button`
  padding: 8px 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
    border-color: #007bff;
    color: #007bff;
  }
  
  i {
    margin-right: 5px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  
  i {
    font-size: 64px;
    color: #ddd;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #666;
  }
  
  p {
    color: #999;
    margin-bottom: 20px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #eee;
  
  h3 {
    font-size: 24px;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
`;

const ModalContent = styled.div`
  margin-top: 20px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  strong {
    color: #333;
  }
  
  span {
    color: #666;
  }
`;

const TrackingTimeline = styled.div`
  margin-top: 20px;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 11px;
    top: 30px;
    width: 2px;
    height: calc(100% + 10px);
    background-color: ${props => props.completed ? '#28a745' : '#ddd'};
  }
`;

const TimelineIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.completed ? '#28a745' : '#ddd'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  flex-shrink: 0;
`;

const TimelineContent = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 5px 0;
    font-size: 16px;
    color: ${props => props.completed ? '#333' : '#999'};
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
`;

const ProductList = styled.div`
  margin-top: 20px;
`;

const ProductItem = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 15px;
  
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 8px 0;
    font-size: 16px;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 14px;
  }
`;

const Profile = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const navigate = useNavigate();
  
  // State management
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: 'Dax',
    lastName: 'Patel',
    email: 'dax.patel@example.com',
    phone: '+91 98765 43210',
    address: '123, MG Road, Nehru Nagar',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400001',
    country: 'India'
  });
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'Dax Patel',
      address: '123, MG Road, Nehru Nagar',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'Dax Patel',
      address: '456, Tech Park, Bandra East',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400051',
      phone: '+91 98765 43211',
      isDefault: false
    }
  ]);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });
  
  // Sample user data
  const user = {
    name: 'Dax Patel',
    email: 'dax.patel@example.com',
    phone: '+91 98765 43210',
    memberSince: 'January 2024'
  };
  
  // Orders data - load from localStorage
  const [orders, setOrders] = useState([]);
  
  // Load orders from localStorage on mount and when activeSection changes
  React.useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      // Combine saved orders with sample orders for demo
      const sampleOrders = [
        {
          id: 'ORD-1730041234567',
          date: '15 October 2025',
          status: 'Delivered',
          total: 99999,
          items: 1,
          products: [
            { name: 'Apple iPhone 15 Pro Max', price: 99999, quantity: 1, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80' }
          ]
        },
        {
          id: 'ORD-1730041234568',
          date: '12 October 2025',
          status: 'Shipped',
          total: 91649,
          items: 1,
          products: [
            { name: 'Samsung Galaxy S24 Ultra', price: 91649, quantity: 1, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80' }
          ]
        }
      ];
      // Show saved orders first, then sample orders
      setOrders([...savedOrders, ...sampleOrders]);
    };
    
    loadOrders();
  }, [activeSection]); // Reload when switching to orders section
  
  // Handle adding new address
  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.city) {
      const address = {
        id: addresses.length + 1,
        ...newAddress,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, address]);
      setNewAddress({
        type: 'Home',
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
      });
      setShowAddAddress(false);
      alert('Address added successfully!');
    } else {
      alert('Please fill all required fields');
    }
  };
  
  // Handle editing address
  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };
  
  // Handle saving edited address
  const handleSaveEditedAddress = () => {
    if (editingAddress.name && editingAddress.address && editingAddress.city) {
      const updatedAddresses = addresses.map(addr => 
        addr.id === editingAddress.id ? editingAddress : addr
      );
      setAddresses(updatedAddresses);
      setEditingAddress(null);
      alert('Address updated successfully!');
    } else {
      alert('Please fill all required fields');
    }
  };
  
  // Handle canceling address edit
  const handleCancelEditAddress = () => {
    setEditingAddress(null);
  };
  
  // Handle setting default address
  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    alert('Default address updated!');
  };
  
  // Handle deleting address
  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      alert('Address deleted successfully!');
    }
  };
  
  // Handle adding wishlist item to cart
  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.name} added to cart!`);
  };
  
  // Handle viewing order details
  const handleViewOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setShowOrderDetails(true);
    }
  };
  
  // Handle tracking order
  const handleTrackOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      // Simulate tracking information
      const tracking = {
        orderId: order.id,
        status: order.status,
        estimatedDelivery: order.status === 'Shipped' ? '28 October 2025' : 'N/A',
        trackingNumber: `TRK${order.id.slice(-8)}`,
        timeline: [
          { status: 'Order Placed', date: order.date, completed: true },
          { status: 'Processing', date: order.date, completed: order.status !== 'Cancelled' },
          { status: 'Shipped', date: order.status === 'Shipped' || order.status === 'Delivered' ? '13 October 2025' : '', completed: order.status === 'Shipped' || order.status === 'Delivered' },
          { status: 'Out for Delivery', date: order.status === 'Delivered' ? '15 October 2025' : '', completed: order.status === 'Delivered' },
          { status: 'Delivered', date: order.status === 'Delivered' ? '15 October 2025' : '', completed: order.status === 'Delivered' }
        ]
      };
      setTrackingInfo(tracking);
      setShowTrackingModal(true);
    }
  };
  
  // Handle downloading invoice
  const handleDownloadInvoice = (orderId) => {
    alert(`Downloading invoice for order ${orderId}...\nInvoice will be saved as ${orderId}.pdf`);
    // In real app, this would generate and download PDF
  };
  
  // Handle canceling order
  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?\nThis action cannot be undone.')) {
      // Update order status to Cancelled
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: 'Cancelled' };
        }
        return order;
      });
      
      // Update state
      setOrders(updatedOrders);
      
      // Update localStorage if order exists there
      const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const updatedSavedOrders = savedOrders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: 'Cancelled' };
        }
        return order;
      });
      localStorage.setItem('userOrders', JSON.stringify(updatedSavedOrders));
      
      // Show success message
      alert(`Order ${orderId} has been cancelled successfully!\nRefund will be processed within 5-7 business days.`);
    }
  };
  
  // Handle return/exchange request
  const handleReturnOrder = (orderId) => {
    const reason = window.prompt('Please select reason for return:\n1. Defective product\n2. Wrong item received\n3. Not satisfied\n4. Other\n\nEnter number (1-4):');
    if (reason) {
      alert(`Return request initiated for order ${orderId}
Return ID: RET${Date.now()}

Next steps:
1. Pack the item securely
2. Our courier will pick up within 2-3 days
3. Refund processed after quality check`);
      // In real app, create return request in database
    }
  };
  
  // Handle buy again
  const handleBuyAgain = (order) => {
    order.products.forEach(product => {
      addToCart(product);
    });
    alert(`${order.products.length} item(s) added to cart!\nGo to cart to complete your purchase.`);
  };
  
  // Handle deleting review
  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== reviewId));
      alert('Review deleted successfully!');
    }
  };
  
  // Handle editing review
  const handleEditReview = (review) => {
    setEditingReview(review);
  };
  
  // Handle saving edited review
  const handleSaveEditedReview = () => {
    if (editingReview.title && editingReview.comment && editingReview.rating) {
      const updatedReviews = reviews.map(review => 
        review.id === editingReview.id ? editingReview : review
      );
      setReviews(updatedReviews);
      setEditingReview(null);
      alert('Review updated successfully!');
    } else {
      alert('Please fill all required fields');
    }
  };
  
  // Handle canceling review edit
  const handleCancelEditReview = () => {
    setEditingReview(null);
  };
  
  // Handle marking review as helpful
  const handleMarkHelpful = (reviewId) => {
    alert('Thanks for your feedback!');
    // In real app, increment helpful counter
  };
  
  // Sample reviews - using state for edit functionality
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: 'Apple iPhone 15 Pro Max',
      productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
      rating: 5,
      date: '16 October 2025',
      title: 'Excellent Phone!',
      comment: 'Best iPhone yet! The titanium design is premium and the camera is outstanding. Battery life is amazing. Highly recommended!',
      helpful: 24
    },
    {
      id: 2,
      productName: 'Samsung Galaxy S24 Ultra',
      productImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80',
      rating: 4,
      date: '13 October 2025',
      title: 'Great Android Flagship',
      comment: 'Powerful device with amazing S Pen functionality. Camera is top-notch. Only complaint is the price.',
      helpful: 15
    },
    {
      id: 3,
      productName: 'Sony WH-1000XM5 Headphones',
      productImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
      rating: 5,
      date: '05 October 2025',
      title: 'Best Noise Cancellation',
      comment: 'Industry-leading noise cancellation. Sound quality is exceptional. Comfortable for long listening sessions.',
      helpful: 32
    }
  ]);
  
  // Profile handlers
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data (in real app, this would make an API call)
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsEditingProfile(false);
    alert('Profile updated successfully!');
  };
  
  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };
  
  const handleCancelEdit = () => {
    // Reset to original data from localStorage or default
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    setIsEditingProfile(false);
  };
  
  // Load profile from localStorage on mount
  React.useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);
  
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>My Account</PageTitle>
        
        <ProfileContainer>
          <Sidebar>
            <SidebarItem 
              className={activeSection === 'profile' ? 'active' : ''} 
              onClick={() => setActiveSection('profile')}
            >
              <i className="fas fa-user"></i> Profile
            </SidebarItem>
            <SidebarItem 
              className={activeSection === 'orders' ? 'active' : ''} 
              onClick={() => setActiveSection('orders')}
            >
              <i className="fas fa-shopping-bag"></i> My Orders
            </SidebarItem>
            <SidebarItem 
              className={activeSection === 'addresses' ? 'active' : ''} 
              onClick={() => setActiveSection('addresses')}
            >
              <i className="fas fa-map-marker-alt"></i> Addresses
            </SidebarItem>
            <SidebarItem 
              className={activeSection === 'wishlist' ? 'active' : ''} 
              onClick={() => setActiveSection('wishlist')}
            >
              <i className="fas fa-heart"></i> Wishlist
            </SidebarItem>
            <SidebarItem 
              className={activeSection === 'reviews' ? 'active' : ''} 
              onClick={() => setActiveSection('reviews')}
            >
              <i className="fas fa-star"></i> My Reviews
            </SidebarItem>
            <SidebarItem 
              className={activeSection === 'settings' ? 'active' : ''} 
              onClick={() => setActiveSection('settings')}
            >
              <i className="fas fa-cog"></i> Settings
            </SidebarItem>
          </Sidebar>
          
          <MainContent>
            {activeSection === 'profile' && (
              <>
                <SectionTitle>Profile Information</SectionTitle>
                
                <ProfileHeader>
                  <Avatar>
                    <i className="fas fa-user"></i>
                  </Avatar>
                  <ProfileInfo>
                    <h2>{profileData.firstName} {profileData.lastName}</h2>
                    <p>{profileData.email}</p>
                    <p>{profileData.phone}</p>
                    {!isEditingProfile && (
                      <EditButton onClick={handleEditProfile}>
                        <i className="fas fa-edit"></i> Edit Profile
                      </EditButton>
                    )}
                  </ProfileInfo>
                </ProfileHeader>
                
                <form onSubmit={handleSubmit}>
                  <FormSection>
                    <FormRow>
                      <FormGroup>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleChange}
                          disabled={!isEditingProfile}
                          required
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleChange}
                          disabled={!isEditingProfile}
                          required
                        />
                      </FormGroup>
                    </FormRow>
                    
                    <FormRow>
                      <FormGroup>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          disabled={!isEditingProfile}
                          required
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleChange}
                          disabled={!isEditingProfile}
                          required
                        />
                      </FormGroup>
                    </FormRow>
                  </FormSection>
                  
                  <FormSection>
                    <SectionTitle>Address Information</SectionTitle>
                    
                    <FormGroup>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        type="text"
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                        disabled={!isEditingProfile}
                        required
                      />
                    </FormGroup>
                    
                    <FormRow>
                      <FormGroup>
                        <Label htmlFor="city">City</Label>
                        <Input
                          type="text"
                          id="city"
                          name="city"
                          value={profileData.city}
                          onChange={handleChange}
                          disabled={!isEditingProfile}
                          required
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="state">State</Label>
                        <Input
                          type="text"
                          id="state"
                          name="state"
                          value={profileData.state}
                          onChange={handleChange}
                          disabled={!isEditingProfile}
                          required
                        />
                      </FormGroup>
                    </FormRow>
                    
                    <FormRow>
                      <FormGroup>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          type="text"
                          id="zip"
                          name="zip"
                          value={profileData.zip}
                          onChange={handleChange}
                          disabled={!isEditingProfile}
                          required
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="country">Country</Label>
                        <Select
                          id="country"
                          name="country"
                          value={profileData.country}
                          onChange={handleChange}
                          disabled={!isEditingProfile}
                          required
                        >
                          <option value="India">India</option>
                          <option value="USA">United States</option>
                          <option value="UK">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                        </Select>
                      </FormGroup>
                    </FormRow>
                  </FormSection>
                  
                  {isEditingProfile && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <SaveButton type="submit">
                        <i className="fas fa-save"></i> Save Changes
                      </SaveButton>
                      <ActionButton onClick={handleCancelEdit}>
                        <i className="fas fa-times"></i> Cancel
                      </ActionButton>
                    </div>
                  )}
                </form>
              </>
            )}
            
            {activeSection === 'orders' && (
              <>
                <SectionTitle>My Orders ({orders.length})</SectionTitle>
                {orders.map(order => (
                  <OrderCard key={order.id}>
                    <OrderHeader>
                      <OrderInfo>
                        <h3>Order #{order.id}</h3>
                        <p>Placed on {order.date} • {order.items} item(s) • {formatCurrency(order.total)}</p>
                      </OrderInfo>
                      <OrderStatus className={order.status.toLowerCase()}>
                        {order.status}
                      </OrderStatus>
                    </OrderHeader>
                    
                    {order.products.map((product, index) => (
                      <OrderProducts key={index}>
                        <ProductImage src={product.image} alt={product.name} />
                        <ProductInfo>
                          <h4>{product.name}</h4>
                          <p>Quantity: {product.quantity} • {formatCurrency(product.price)}</p>
                        </ProductInfo>
                      </OrderProducts>
                    ))}
                    
                    <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <ActionButton onClick={() => handleViewOrder(order.id)}>
                        <i className="fas fa-eye"></i> View Details
                      </ActionButton>
                      
                      {(order.status === 'Shipped' || order.status === 'Processing' || order.status === 'Delivered') && (
                        <ActionButton onClick={() => handleTrackOrder(order.id)}>
                          <i className="fas fa-map-marker-alt"></i> Track Order
                        </ActionButton>
                      )}
                      
                      {(order.status === 'Delivered' || order.status === 'Shipped') && (
                        <ActionButton onClick={() => handleDownloadInvoice(order.id)}>
                          <i className="fas fa-download"></i> Download Invoice
                        </ActionButton>
                      )}
                      
                      {order.status === 'Delivered' && (
                        <ActionButton onClick={() => handleReturnOrder(order.id)}>
                          <i className="fas fa-undo"></i> Return/Exchange
                        </ActionButton>
                      )}
                      
                      {order.status === 'Processing' && (
                        <ActionButton className="delete" onClick={() => handleCancelOrder(order.id)}>
                          <i className="fas fa-times"></i> Cancel Order
                        </ActionButton>
                      )}
                      
                      {(order.status === 'Delivered' || order.status === 'Cancelled') && (
                        <ActionButton onClick={() => handleBuyAgain(order)}>
                          <i className="fas fa-shopping-cart"></i> Buy Again
                        </ActionButton>
                      )}
                    </div>
                  </OrderCard>
                ))}
              </>
            )}
            
            {activeSection === 'addresses' && (
              <>
                <SectionTitle>My Addresses ({addresses.length})</SectionTitle>
                {addresses.map(address => (
                  <>{editingAddress && editingAddress.id === address.id ? (
                    // Edit mode
                    <AddressCard key={address.id} style={{backgroundColor: '#f0f8ff', border: '2px solid #667eea'}}>
                      <h4>Edit Address</h4>
                      <FormSection>
                        <FormRow>
                          <FormGroup>
                            <Label>Address Type</Label>
                            <Select 
                              value={editingAddress.type} 
                              onChange={(e) => setEditingAddress({...editingAddress, type: e.target.value})}
                            >
                              <option value="Home">Home</option>
                              <option value="Office">Office</option>
                              <option value="Other">Other</option>
                            </Select>
                          </FormGroup>
                          <FormGroup>
                            <Label>Full Name *</Label>
                            <Input 
                              value={editingAddress.name}
                              onChange={(e) => setEditingAddress({...editingAddress, name: e.target.value})}
                              placeholder="Enter full name"
                            />
                          </FormGroup>
                        </FormRow>
                        <FormGroup>
                          <Label>Address *</Label>
                          <Input 
                            value={editingAddress.address}
                            onChange={(e) => setEditingAddress({...editingAddress, address: e.target.value})}
                            placeholder="House no., Street name"
                          />
                        </FormGroup>
                        <FormRow>
                          <FormGroup>
                            <Label>City *</Label>
                            <Input 
                              value={editingAddress.city}
                              onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
                              placeholder="City"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>State *</Label>
                            <Input 
                              value={editingAddress.state}
                              onChange={(e) => setEditingAddress({...editingAddress, state: e.target.value})}
                              placeholder="State"
                            />
                          </FormGroup>
                        </FormRow>
                        <FormRow>
                          <FormGroup>
                            <Label>ZIP Code *</Label>
                            <Input 
                              value={editingAddress.zip}
                              onChange={(e) => setEditingAddress({...editingAddress, zip: e.target.value})}
                              placeholder="ZIP Code"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Phone Number *</Label>
                            <Input 
                              value={editingAddress.phone}
                              onChange={(e) => setEditingAddress({...editingAddress, phone: e.target.value})}
                              placeholder="+91 XXXXX XXXXX"
                            />
                          </FormGroup>
                        </FormRow>
                      </FormSection>
                      <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                        <SaveButton onClick={handleSaveEditedAddress}>
                          <i className="fas fa-check"></i> Save Changes
                        </SaveButton>
                        <ActionButton onClick={handleCancelEditAddress}>
                          <i className="fas fa-times"></i> Cancel
                        </ActionButton>
                      </div>
                    </AddressCard>
                  ) : (
                    // View mode
                  <AddressCard key={address.id} isDefault={address.isDefault}>
                    <AddressType>{address.type}</AddressType>
                    <h4>{address.name}</h4>
                    <p>{address.address}</p>
                    <p>{address.city}, {address.state} {address.zip}</p>
                    <p>Phone: {address.phone}</p>
                    {address.isDefault && <DefaultBadge>Default</DefaultBadge>}
                    <AddressActions>
                      <ActionButton onClick={() => handleEditAddress(address)}>
                        <i className="fas fa-edit"></i> Edit
                      </ActionButton>
                      {!address.isDefault && (
                        <>
                          <ActionButton className="delete" onClick={() => handleDeleteAddress(address.id)}>
                            <i className="fas fa-trash"></i> Delete
                          </ActionButton>
                          <ActionButton onClick={() => handleSetDefault(address.id)}>
                            <i className="fas fa-check"></i> Set as Default
                          </ActionButton>
                        </>
                      )}
                    </AddressActions>
                  </AddressCard>
                  )}</>
                ))}
                
                {!showAddAddress && (
                  <SaveButton onClick={() => setShowAddAddress(true)} style={{marginTop: '20px'}}>
                    <i className="fas fa-plus"></i> Add New Address
                  </SaveButton>
                )}
                
                {showAddAddress && (
                  <AddressCard style={{marginTop: '20px', backgroundColor: '#f8f9fa'}}>
                    <h4>Add New Address</h4>
                    <FormSection>
                      <FormRow>
                        <FormGroup>
                          <Label>Address Type</Label>
                          <Select 
                            value={newAddress.type} 
                            onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                          >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                          </Select>
                        </FormGroup>
                        <FormGroup>
                          <Label>Full Name *</Label>
                          <Input 
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                            placeholder="Enter full name"
                          />
                        </FormGroup>
                      </FormRow>
                      <FormGroup>
                        <Label>Address *</Label>
                        <Input 
                          value={newAddress.address}
                          onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                          placeholder="House no., Street name"
                        />
                      </FormGroup>
                      <FormRow>
                        <FormGroup>
                          <Label>City *</Label>
                          <Input 
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                            placeholder="City"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>State *</Label>
                          <Input 
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                            placeholder="State"
                          />
                        </FormGroup>
                      </FormRow>
                      <FormRow>
                        <FormGroup>
                          <Label>ZIP Code *</Label>
                          <Input 
                            value={newAddress.zip}
                            onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                            placeholder="ZIP Code"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Phone Number *</Label>
                          <Input 
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </FormGroup>
                      </FormRow>
                    </FormSection>
                    <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                      <SaveButton onClick={handleAddAddress}>
                        <i className="fas fa-check"></i> Save Address
                      </SaveButton>
                      <ActionButton onClick={() => setShowAddAddress(false)}>
                        <i className="fas fa-times"></i> Cancel
                      </ActionButton>
                    </div>
                  </AddressCard>
                )}
              </>
            )}
            
            {activeSection === 'wishlist' && (
              <>
                <SectionTitle>My Wishlist ({wishlist.length})</SectionTitle>
                {wishlist.length === 0 ? (
                  <EmptyState>
                    <i className="fas fa-heart"></i>
                    <h3>Your wishlist is empty</h3>
                    <p>Save items you love to your wishlist</p>
                    <Link to="/products">
                      <SaveButton>Browse Products</SaveButton>
                    </Link>
                  </EmptyState>
                ) : (
                  <WishlistGrid>
                    {wishlist.map(item => (
                      <WishlistCard key={item.id}>
                        <Link to={`/product/${item.id}`}>
                          <WishlistImage src={item.image} alt={item.name} />
                        </Link>
                        <WishlistInfo>
                          <h4>{item.name}</h4>
                          <p>{formatCurrency(item.price)}</p>
                          <WishlistActions>
                            <WishlistButton 
                              className="add-to-cart"
                              onClick={() => handleAddToCart(item)}
                            >
                              <i className="fas fa-shopping-cart"></i> Add to Cart
                            </WishlistButton>
                            <WishlistButton 
                              className="remove"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </WishlistButton>
                          </WishlistActions>
                        </WishlistInfo>
                      </WishlistCard>
                    ))}
                  </WishlistGrid>
                )}
              </>
            )}
            
            {activeSection === 'reviews' && (
              <>
                <SectionTitle>My Reviews ({reviews.length})</SectionTitle>
                {reviews.map(review => (
                  <>{editingReview && editingReview.id === review.id ? (
                    // Edit mode
                    <ReviewCard key={review.id} style={{backgroundColor: '#f0f8ff', border: '2px solid #667eea'}}>
                      <ReviewHeader>
                        <ReviewProductImage src={review.productImage} alt={review.productName} />
                        <ReviewProductInfo>
                          <h4>{review.productName}</h4>
                          <FormGroup style={{marginTop: '10px'}}>
                            <Label>Your Rating *</Label>
                            <ReviewRating style={{fontSize: '24px', cursor: 'pointer'}}>
                              {[...Array(5)].map((_, i) => (
                                <i 
                                  key={i}
                                  className={i < editingReview.rating ? 'fas fa-star' : 'far fa-star'}
                                  onClick={() => setEditingReview({...editingReview, rating: i + 1})}
                                  style={{marginRight: '5px'}}
                                ></i>
                              ))}
                            </ReviewRating>
                          </FormGroup>
                        </ReviewProductInfo>
                      </ReviewHeader>
                      
                      <FormSection>
                        <FormGroup>
                          <Label>Review Title *</Label>
                          <Input 
                            value={editingReview.title}
                            onChange={(e) => setEditingReview({...editingReview, title: e.target.value})}
                            placeholder="Summarize your review"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Your Review *</Label>
                          <textarea
                            value={editingReview.comment}
                            onChange={(e) => setEditingReview({...editingReview, comment: e.target.value})}
                            placeholder="Share your experience with this product"
                            rows="5"
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: '1px solid #ddd',
                              borderRadius: '8px',
                              fontSize: '14px',
                              fontFamily: 'inherit',
                              resize: 'vertical'
                            }}
                          />
                        </FormGroup>
                      </FormSection>
                      
                      <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                        <SaveButton onClick={handleSaveEditedReview}>
                          <i className="fas fa-check"></i> Save Changes
                        </SaveButton>
                        <ActionButton onClick={handleCancelEditReview}>
                          <i className="fas fa-times"></i> Cancel
                        </ActionButton>
                      </div>
                    </ReviewCard>
                  ) : (
                    // View mode
                  <ReviewCard key={review.id}>
                    <ReviewHeader>
                      <ReviewProductImage src={review.productImage} alt={review.productName} />
                      <ReviewProductInfo>
                        <h4>{review.productName}</h4>
                        <ReviewRating>
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i} 
                              className={i < review.rating ? 'fas fa-star' : 'far fa-star'}
                            ></i>
                          ))}
                        </ReviewRating>
                        <ReviewDate>{review.date}</ReviewDate>
                      </ReviewProductInfo>
                    </ReviewHeader>
                    
                    <ReviewContent>
                      <h5>{review.title}</h5>
                      <p>{review.comment}</p>
                    </ReviewContent>
                    
                    <ReviewFooter>
                      <HelpfulButton onClick={() => handleMarkHelpful(review.id)}>
                        <i className="fas fa-thumbs-up"></i>
                        Helpful ({review.helpful})
                      </HelpfulButton>
                      <div>
                        <ActionButton style={{marginRight: '10px'}} onClick={() => handleEditReview(review)}>
                          <i className="fas fa-edit"></i> Edit
                        </ActionButton>
                        <ActionButton className="delete" onClick={() => handleDeleteReview(review.id)}>
                          <i className="fas fa-trash"></i> Delete
                        </ActionButton>
                      </div>
                    </ReviewFooter>
                  </ReviewCard>
                  )}</>
                ))}
              </>
            )}
            
            {activeSection === 'settings' && (
              <>
                <SectionTitle>Account Settings</SectionTitle>
                <p>Account settings options would appear here.</p>
              </>
            )}
          </MainContent>
        </ProfileContainer>
      </div>
      
      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <ModalOverlay onClick={() => setShowOrderDetails(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>Order Details</h3>
              <CloseButton onClick={() => setShowOrderDetails(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalContent>
              <DetailRow>
                <strong>Order ID:</strong>
                <span>{selectedOrder.id}</span>
              </DetailRow>
              <DetailRow>
                <strong>Order Date:</strong>
                <span>{selectedOrder.date}</span>
              </DetailRow>
              <DetailRow>
                <strong>Status:</strong>
                <OrderStatus className={selectedOrder.status.toLowerCase()}>
                  {selectedOrder.status}
                </OrderStatus>
              </DetailRow>
              <DetailRow>
                <strong>Total Amount:</strong>
                <span style={{fontSize: '18px', fontWeight: 'bold', color: '#28a745'}}>
                  {formatCurrency(selectedOrder.total)}
                </span>
              </DetailRow>
              <DetailRow>
                <strong>Number of Items:</strong>
                <span>{selectedOrder.items}</span>
              </DetailRow>
              
              <ProductList>
                <h4 style={{marginBottom: '15px'}}>Products:</h4>
                {selectedOrder.products.map((product, index) => (
                  <ProductItem key={index}>
                    <img src={product.image} alt={product.name} />
                    <ProductDetails>
                      <h4>{product.name}</h4>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {formatCurrency(product.price)}</p>
                    </ProductDetails>
                  </ProductItem>
                ))}
              </ProductList>
              
              <div style={{marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                <SaveButton onClick={() => setShowOrderDetails(false)}>
                  Close
                </SaveButton>
              </div>
            </ModalContent>
          </Modal>
        </ModalOverlay>
      )}
      
      {/* Tracking Modal */}
      {showTrackingModal && trackingInfo && (
        <ModalOverlay onClick={() => setShowTrackingModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>Track Your Order</h3>
              <CloseButton onClick={() => setShowTrackingModal(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalContent>
              <DetailRow>
                <strong>Order ID:</strong>
                <span>{trackingInfo.orderId}</span>
              </DetailRow>
              <DetailRow>
                <strong>Tracking Number:</strong>
                <span>{trackingInfo.trackingNumber}</span>
              </DetailRow>
              <DetailRow>
                <strong>Current Status:</strong>
                <OrderStatus className={trackingInfo.status.toLowerCase()}>
                  {trackingInfo.status}
                </OrderStatus>
              </DetailRow>
              {trackingInfo.estimatedDelivery !== 'N/A' && (
                <DetailRow>
                  <strong>Estimated Delivery:</strong>
                  <span>{trackingInfo.estimatedDelivery}</span>
                </DetailRow>
              )}
              
              <TrackingTimeline>
                <h4 style={{marginBottom: '20px'}}>Tracking Timeline:</h4>
                {trackingInfo.timeline.map((item, index) => (
                  <TimelineItem key={index} completed={item.completed}>
                    <TimelineIcon completed={item.completed}>
                      {item.completed && <i className="fas fa-check"></i>}
                    </TimelineIcon>
                    <TimelineContent completed={item.completed}>
                      <h4>{item.status}</h4>
                      {item.date && <p>{item.date}</p>}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </TrackingTimeline>
              
              <div style={{marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                <SaveButton onClick={() => setShowTrackingModal(false)}>
                  Close
                </SaveButton>
              </div>
            </ModalContent>
          </Modal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Profile;