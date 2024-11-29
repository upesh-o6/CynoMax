import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import './Shopping.css';

const Shopping = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, incrementQuantity, decrementQuantity } = useCart();
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products') // Example API
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.title} added to cart!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  return (
    <div className="shopping-container">
      {notification && <div className="cart-notification">{notification}</div>}
      {products.map(product => (
        <div key={product.id} className="product-box">
          <img src={product.image} alt={product.title} className="product-image" />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          <div className="quantity-controls">
            <button onClick={() => decrementQuantity(product.id)}>-</button>
            <span>Quantity</span>
            <button onClick={() => incrementQuantity(product.id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shopping;
