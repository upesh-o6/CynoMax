// Shopping.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import ThreeProductPreview from "./ThreeProductPreview";
import { useGLTF } from "@react-three/drei";
import "./Shopping.css";

export default function Shopping() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [previewProduct, setPreviewProduct] = useState(null);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Optional: preload only if you actually have model URLs
  // useGLTF.preload("https://your-cdn.com/models/sample.glb");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=20", { signal });
        const data = await res.json();

        // IMPORTANT: Do NOT assign the avocado model to every product.
        // Only set modelUrl if your product actually has a 3D model.
        const normalized = data.products.map((p) => ({
          ...p,
          price: Number(p.price),
          image: p.thumbnail || p.images?.[0] || "https://via.placeholder.com/300",
          // modelUrl: p.modelUrl ?? null  // keep it null unless real model available
          modelUrl: null
        }));

        setProducts(normalized);
        setFiltered(normalized);
      } catch (err) {
        if (err.name !== "AbortError") setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(products);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(
      products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
    );
  }, [search, products]);

  const requireLogin = (action) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    action();
  };

  const handleAddToCart = (product) => {
    requireLogin(() => {
      addToCart(product);
      navigate("/cart");
    });
  };

  const handleBuyNow = (product) => {
    requireLogin(() => {
      addToCart(product);
      navigate("/checkout", { state: { buyNowProduct: product } });
    });
  };

  const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!filtered.length) return <div className="error">No products found.</div>;

  return (
    <div className="shopping-container">
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currency={currency}
            onAdd={() => handleAddToCart(product)}
            onBuy={() => handleBuyNow(product)}
            onPreview3D={setPreviewProduct}
          />
        ))}
      </div>

      {previewProduct && (
        <div className="preview-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setPreviewProduct(null)}>✖</button>

            {previewProduct.modelUrl ? (
              <ThreeProductPreview modelUrl={previewProduct.modelUrl} />
            ) : (
              <div style={{ padding: "16px", textAlign: "center" }}>
                <img
                  src={previewProduct.image}
                  alt={previewProduct.title}
                  style={{
                    width: "100%",
                    maxHeight: "420px",
                    objectFit: "contain",
                    borderRadius: "12px"
                  }}
                />
                <p style={{ marginTop: "10px" }}>
                  No 3D preview available for this product.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}