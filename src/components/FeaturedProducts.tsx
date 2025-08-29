import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, onAddToCart }) => {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center">
          <Star className="h-8 w-8 text-yellow-500 mr-3 fill-current" />
          Featured Products
        </h2>
        <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <span>View All</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <div key={product.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};