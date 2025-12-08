import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartItems, incrementQuantity, decrementQuantity, addToCart, totalAmount } = useCart();
  const { isAuthenticated } = useAuth();
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=12")
      .then((response) => response.json())
      .then((data) => {
        setSuggestedProducts(data.products);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const requireLogin = (action) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    action();
  };

  const handleBuyNow = (item) => {
    requireLogin(() => {
      addToCart(item);
      navigate("/checkout", { state: { buyNowProduct: item } });
    });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                </td>
                <td>{item.title}</td>
                <td>
                  <div className="quantity-controls">
                    <button onClick={() => decrementQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                </td>
                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="btn-primary" onClick={() => handleBuyNow(item)}>
                    Buy Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="cart-total">
        <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
        {cartItems.length > 0 && (
          <button
            className="checkout-btn"
            onClick={() =>
              requireLogin(() => {
                navigate("/checkout");
              })
            }
          >
            Proceed to Checkout
          </button>
        )}
      </div>

      <div className="suggested-products">
        <h3>You may also like</h3>
        <div className="suggested-products-grid">
          {suggestedProducts.map((product) => (
            <div key={product.id} className="suggested-product-box">
              <img src={product.thumbnail} alt={product.title} className="suggested-product-image" />
              <h4>{product.title}</h4>
              <p>₹{product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => handleBuyNow(product)}>Buy Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;