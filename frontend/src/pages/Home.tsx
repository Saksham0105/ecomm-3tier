import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  numReviews: number;
  stock: number;
  category: string;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'sports', label: 'Sports' },
  { value: 'toys', label: 'Toys & Games' }
];

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products', {
        params: {
          search: searchTerm,
          category: selectedCategory
        }
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [searchTerm, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadProducts();
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-8 rounded-2xl">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to E-Shop
        </h1>
        <p className="text-xl opacity-90 mb-8">
          Discover amazing products at unbeatable prices
        </p>
        <div className="flex items-center justify-center space-x-2">
          <ShoppingBag size={24} />
          <span className="text-lg">Free shipping on orders over $50</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white min-w-[200px]"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory ? `${categories.find(c => c.value === selectedCategory)?.label}` : 'All Products'}
            </h2>
            <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {products.length} products found
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-2">No products found</p>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Home;