import React from "react";
import { useCart } from "./CartContext";
import { useLocation } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems } = useCart();
  const location = useLocation();
  const buyNowProduct = location.state?.buyNowProduct;

  const productsToCheckout = buyNowProduct ? [buyNowProduct] : cartItems;

  if (!productsToCheckout || productsToCheckout.length === 0) {
    return <div className="error">No products to checkout.</div>;
  }

  const total = productsToCheckout.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-grid">
        <div className="checkout-items">
          {productsToCheckout.map((product) => (
            <div key={product.id} className="checkout-item">
              <img src={product.image || product.thumbnail} alt={product.title} className="checkout-img" />
              <div>
                <h3>{product.title}</h3>
                <p>₹{product.price.toFixed(2)}</p>
                <p>Quantity: {product.quantity || 1}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <ul>
            {productsToCheckout.map((p) => (
              <li key={p.id}>
                {p.title} × {p.quantity || 1} — ₹{(p.price * (p.quantity || 1)).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total.toFixed(2)}</h3>
          <button className="checkout-btn">Place Order</button>
        </div>
      </div>
    </div>
  );
}