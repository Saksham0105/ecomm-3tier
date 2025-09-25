import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  numReviews: number;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addToCart(product._id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 border border-gray-100">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {user && (
            <button
              onClick={handleAddToCart}
              className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-700 transform hover:scale-110"
            >
              <Plus size={16} />
            </button>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.numReviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.stock} left
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;