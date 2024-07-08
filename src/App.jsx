import React, { useCallback, useEffect, useState } from "react";
import logo from "./assets/logo.png";
import { products } from "./utils/data.js";

// Custom debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function App() {
  const [country, setCountry] = useState("");
  const [result, setResult] = useState([]);

  // Create a debounced version of the search function
  const debouncedSearch = useCallback(
    debounce((country) => {
      // Ensure the comparison is done on the name property of each product
      const fileredItem = products.filter((product) =>
        product.name.toLowerCase().includes(country.toLowerCase())
      );
      setResult(fileredItem);
    }, 1000), // Adjust the debounce interval as needed
    []
  );

  useEffect(() => {
    if (country) {
      debouncedSearch(country);
    }
  }, [country, debouncedSearch]);

  return (
    <>
      <div className="container">
        <img
          src={logo}
          alt="The Logo"
          style={{ width: "80px", margin: "10px", borderRadius: "50%" }}
        />
        <form>
          <h1>Product</h1>
          <input
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            placeholder="Type a country name"
          />
        </form>
        <div className="product-list">
          {result &&
            result.map((product) => (
              <div key={product.id} className="product-item">
                <p>{product.name}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
