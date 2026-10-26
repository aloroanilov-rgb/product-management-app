import { useState } from "react";

import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";

import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Oversized T-Shirt",
    category: "Shirts",
    description:
      "A comfortable oversized shirt perfect for everyday outfits.",
    specification: "Cotton fabric, relaxed fit",
    rating: 4.8,
    price: 350,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Denim Jeans",
    category: "Pants",
    description:
      "Stylish denim jeans suitable for casual occasions.",
    specification: "Denim fabric, classic fit",
    rating: 4.7,
    price: 750,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Denim Jacket",
    category: "Jackets",
    description:
      "A classic denim jacket that matches casual outfits.",
    specification: "Denim material, button closure",
    rating: 4.9,
    price: 950,
    stock: 3,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Casual Sneakers",
    category: "Shoes",
    description:
      "Comfortable sneakers for everyday activities.",
    specification: "Rubber sole, lace-up design",
    rating: 4.6,
    price: 1200,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
  },
];

function App() {
  const [products, setProducts] = useState(initialProducts);

  const [cart, setCart] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // FILTER PRODUCTS
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  // ADD TO CART
  function addToCart(id) {
    const product = products.find(
      (item) => item.id === id
    );

    if (!product || product.stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    const cartItem = cart.find(
      (item) => item.id === id
    );

    if (
      cartItem &&
      cartItem.quantity >= product.stock
    ) {
      alert("You have reached the available stock limit.");
      return;
    }

    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.id === id
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          id,
          quantity: 1,
        },
      ];
    });
  }

  // INCREASE QUANTITY
  function increaseQuantity(id) {
    const product = products.find(
      (item) => item.id === id
    );

    const cartItem = cart.find(
      (item) => item.id === id
    );

    if (!product || !cartItem) {
      return;
    }

    if (cartItem.quantity >= product.stock) {
      alert("No more stock available.");
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // DECREASE QUANTITY
  function decreaseQuantity(id) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // ADD NEW PRODUCT
  function addProduct(newProduct) {
    setProducts((previousProducts) => [
      ...previousProducts,
      {
        ...newProduct,
        id: Date.now(),
      },
    ]);
  }

  // TOTAL ITEMS IN CART
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // OVERALL TOTAL
  const overallTotal = cart.reduce(
    (total, item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

      return product
        ? total + product.price * item.quantity
        : total;
    },
    0
  );

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="brand">
          <h1>STYLEHUB</h1>

          <p>Clothing Shop</p>

          <span>
            Find your style. Wear your confidence.
          </span>
        </div>

        <div className="cart-counter">
          🛍️ Cart: {cartCount}
        </div>
      </header>

      <main className="container">
        {/* WELCOME BANNER */}
        <section className="welcome-banner">
          <p className="welcome-label">
            NEW COLLECTION
          </p>

          <h2>Style That Speaks</h2>

          <p>
            Discover your favorite outfits at StyleHub.
          </p>
        </section>

        {/* PRODUCT SECTION */}
        <section className="products-section">
          <div className="section-heading">
            <div>
              <h2>Our Collection</h2>

              <p>
                Find your next favorite outfit.
              </p>
            </div>

            {/* CATEGORY FILTER */}
            <div className="filter-container">
              <label htmlFor="category-filter">
                Category:
              </label>

              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
              >
                <option value="All">All Products</option>
                <option value="Shirts">Shirts</option>
                <option value="Pants">Pants</option>
                <option value="Jackets">Jackets</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">
                  Accessories
                </option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="empty-products">
              No products found in this category.
            </p>
          ) : (
            <ProductList
              products={filteredProducts}
              cart={cart}
              onAddToCart={addToCart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onViewDetails={setSelectedProduct}
            />
          )}
        </section>

        {/* ORDER DETAILS */}
        <Cart
          cart={cart}
          products={products}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />

        {/* ORDER SUMMARY */}
        <section className="summary-card">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>
            <strong>{cartCount}</strong>
          </div>

          <div className="summary-row">
            <span>Overall Total</span>

            <strong>
              ₱
              {overallTotal.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
              })}
            </strong>
          </div>
        </section>

        {/* ADD NEW PRODUCT */}
        <AddProduct onAddProduct={addProduct} />

        {/* FOOTER */}
        <footer className="footer">
          <h3>STYLEHUB CLOTHING SHOP</h3>

          <p>
            Your style, your choice.
          </p>

          <p>
            React + Vite Product Management App
          </p>
        </footer>
      </main>

      {/* PRODUCT DETAILS MODAL */}
      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;