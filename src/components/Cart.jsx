import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, incrementQuantity, decrementQuantity, totalAmount } = useCart();
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        // Increase the number of suggested products
        setSuggestedProducts(data.slice(0, 8));
      });
  }, []);

  return (
    <div className="cart-container">
      <table className="cart-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Image</th>
            <th>Quant</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td><img src={item.image} alt={item.title} className="cart-item-image" /></td>
              <td>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                </div>
              </td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <h3>Total: ${totalAmount}</h3>
      </div>
      <div className="suggested-products">
        <h3>You may like this too</h3>
        <div className="suggested-products-grid">
          {suggestedProducts.map(product => (
            <div key={product.id} className="suggested-product-box">
              <img src={product.image} alt={product.title} className="suggested-product-image" />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
              <button onClick={() => alert('Item added to cart!')}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
