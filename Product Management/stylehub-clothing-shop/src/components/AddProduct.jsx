import { useState } from "react";

function AddProduct({ onAddProduct }) {
  const [form, setForm] = useState({
    name: "",
    category: "Shirts",
    description: "",
    specification: "",
    rating: "",
    price: "",
    stock: "",
    image: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.specification.trim() ||
      !form.image.trim() ||
      form.rating === "" ||
      form.price === "" ||
      form.stock === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const rating = Number(form.rating);
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 5 ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      alert("Please enter valid product information.");
      return;
    }

    onAddProduct({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      specification: form.specification.trim(),
      rating,
      price,
      stock,
    });

    setForm({
      name: "",
      category: "Shirts",
      description: "",
      specification: "",
      rating: "",
      price: "",
      stock: "",
      image: "",
    });

    alert("Product added successfully!");
  }

  return (
    <section className="form-section">
      <h2>➕ Add New Product</h2>

      <p>
        Fill in the information below to add a new item.
      </p>

      <form
        onSubmit={handleSubmit}
        className="product-form"
      >
        <label htmlFor="product-name">
          Product Name
        </label>

        <input
          id="product-name"
          name="name"
          type="text"
          placeholder="Enter product name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="product-category">
          Category
        </label>

        <select
          id="product-category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="Shirts">Shirts</option>
          <option value="Pants">Pants</option>
          <option value="Jackets">Jackets</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
        </select>

        <label htmlFor="product-image">
          Product Image URL
        </label>

        <input
          id="product-image"
          name="image"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={form.image}
          onChange={handleChange}
          required
        />

        <label htmlFor="product-description">
          Description
        </label>

        <textarea
          id="product-description"
          name="description"
          placeholder="Enter product description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="product-specification">
          Product Specification
        </label>

        <input
          id="product-specification"
          name="specification"
          type="text"
          placeholder="Example: Cotton fabric, medium size"
          value={form.specification}
          onChange={handleChange}
          required
        />

        <label htmlFor="product-rating">
          Rating (0–5)
        </label>

        <input
          id="product-rating"
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          placeholder="Example: 4.8"
          value={form.rating}
          onChange={handleChange}
          required
        />

        <label htmlFor="product-price">
          Price (₱)
        </label>

        <input
          id="product-price"
          name="price"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="product-stock">
          Quantity / Stock
        </label>

        <input
          id="product-stock"
          name="stock"
          type="number"
          min="0"
          step="1"
          placeholder="Enter available stock"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <button
          className="add-button"
          type="submit"
        >
          Save Product
        </button>
      </form>
    </section>
  );
}

export default AddProduct;