const mongoose = require('mongoose');
const Product = require('./models/Product');

// Sample products data
const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    category: "electronics",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
    stock: 25,
    rating: 4.5,
    numReviews: 128
  },
  {
    name: "Smartphone 12 Pro",
    description: "Latest smartphone with advanced camera system and 5G connectivity.",
    price: 999.99,
    category: "electronics",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500",
    stock: 15,
    rating: 4.8,
    numReviews: 256
  },
  {
    name: "Cotton Casual T-Shirt",
    description: "Comfortable 100% cotton t-shirt available in multiple colors.",
    price: 29.99,
    category: "clothing",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500",
    stock: 50,
    rating: 4.2,
    numReviews: 89
  },
  {
    name: "JavaScript Programming Guide",
    description: "Comprehensive guide to modern JavaScript programming and best practices.",
    price: 45.99,
    category: "books",
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=500",
    stock: 30,
    rating: 4.7,
    numReviews: 167
  },
  {
    name: "Smart Home Security Camera",
    description: "WiFi-enabled security camera with motion detection and night vision.",
    price: 149.99,
    category: "electronics",
    image: "https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg?auto=compress&cs=tinysrgb&w=500",
    stock: 20,
    rating: 4.3,
    numReviews: 94
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with advanced cushioning and breathable mesh.",
    price: 129.99,
    category: "sports",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
    stock: 35,
    rating: 4.6,
    numReviews: 203
  },
  {
    name: "Wooden Coffee Table",
    description: "Handcrafted wooden coffee table with storage compartment.",
    price: 299.99,
    category: "home",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=500",
    stock: 8,
    rating: 4.4,
    numReviews: 56
  },
  {
    name: "Educational Building Blocks",
    description: "Colorful building blocks set for creative learning and development.",
    price: 39.99,
    category: "toys",
    image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=500",
    stock: 40,
    rating: 4.8,
    numReviews: 112
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();