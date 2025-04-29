import React, { useState, useCallback, useMemo } from "react";

const ProductCard = React.memo(({ product, onAdd }) => (
  <div style={styles.productCard}>
    <h3>{product.name}</h3>
    <p>₹{product.price}</p>
    <button style={styles.button} onClick={() => onAdd(product)}>
      Add to Cart
    </button>
  </div>
));

const CartItem = React.memo(({ item, onIncrement, onDecrement, onRemove }) => (
  <div style={styles.cartItem}>
    <h4>{item.name}</h4>
    <p>
      ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
    </p>
    <div style={styles.controls}>
      <button
        onClick={() => onDecrement(item.id)}
        disabled={item.quantity <= 1}
      >
        -
      </button>
      <span>{item.quantity}</span>
      <button onClick={() => onIncrement(item.id)}>+</button>
      <button style={styles.removeButton} onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  </div>
));

const CartApp = () => {
  const [cart, setCart] = useState([]);

  const products = useMemo(
    () => [
      { id: 1, name: "T-shirt", price: 299 },
      { id: 2, name: "Jeans", price: 999 },
      { id: 3, name: "Sneakers", price: 1999 },
      { id: 4, name: "Cap", price: 199 },
      { id: 5, name: "Jacket", price: 1499 },
    ],
    []
  );

  const handleAddToCart = useCallback((product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const handleIncrement = useCallback((id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const handleDecrement = useCallback((id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }, []);

  const handleRemove = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div style={styles.container}>
      <div style={styles.productList}>
        <h2 style={styles.sectionTitle}>Products</h2>
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <div style={styles.cartSection}>
        <h2 style={styles.sectionTitle}>Your Cart</h2>
        {cart.length === 0 ? (
          <p style={{ color: "lightgray" }}>Cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemove}
              />
            ))}
            <h3 style={{ color: "white" }}>Total: ₹{totalAmount}</h3>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    backgroundColor: "#1e1e1e",
    color: "white",
    padding: 20,
    minHeight: "100vh",
  },
  productList: {
    flex: 2,
    marginRight: 20,
  },
  cartSection: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 10,
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  productCard: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    width: 140,
    textAlign: "center",
  },
  cartItem: {
    backgroundColor: "#444",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },
  removeButton: {
    backgroundColor: "crimson",
    color: "white",
    padding: "4px 8px",
    border: "none",
    borderRadius: 4,
    marginLeft: "auto",
    cursor: "pointer",
  },
  sectionTitle: {
    borderBottom: "2px solid #555",
    paddingBottom: 5,
    marginBottom: 10,
  },
};

export default CartApp;
