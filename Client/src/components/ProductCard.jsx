// ProductCard.jsx
import React from "react";

export default function ProductCard({ product, currency, onAdd, onBuy, onPreview3D }) {
  return (
    <div className="product-card">
      <div className="product-preview">
        <img src={product.image} alt={product.title} className="product-img" />
      </div>

      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">{currency.format(product.price)}</p>

      <div className="button-group">
        <button className="btn-primary" onClick={onAdd}>Add to Cart</button>
        <button className="btn-secondary" onClick={onBuy}>Buy Now</button>
        <button
          className="btn-tertiary"
          onClick={() => onPreview3D(product)}
          style={{ padding: "0.6rem 1.2rem", borderRadius: "12px", fontWeight: 600 }}
        >
          View in 3D
        </button>
      </div>
    </div>
  );
}