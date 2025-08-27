// src/data/products.js
export const products = [
  {
    id: 1,
    name: "MacBook Pro 14",
    price: 1999.99,
    category: "electronics",
    image: "/api/placeholder/300/200",
    description: "Apple MacBook Pro with M2 chip"
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999.99,
    category: "electronics", 
    image: "/api/placeholder/300/200",
    description: "Latest iPhone with titanium design"
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249.99,
    category: "electronics",
    image: "/api/placeholder/300/200", 
    description: "Wireless earbuds with noise cancellation"
  },
  {
    id: 4,
    name: "Nike Air Force 1",
    price: 89.99,
    category: "clothing",
    image: "/api/placeholder/300/200",
    description: "Classic white sneakers"
  },
  {
    id: 5,
    name: "Levi's 501 Jeans",
    price: 69.99,
    category: "clothing",
    image: "/api/placeholder/300/200",
    description: "Original fit denim jeans"
  },
  {
    id: 6,
    name: "The Great Gatsby",
    price: 12.99,
    category: "books",
    image: "/api/placeholder/300/200",
    description: "Classic American novel by F. Scott Fitzgerald"
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'books', name: 'Books' }
];