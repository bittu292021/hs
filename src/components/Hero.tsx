import React from 'react';
import { ShoppingBag, Zap, Shield, Truck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">ShopHub</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Fast delivery, secure payments, and exceptional customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-blue-100">Quick ordering and instant UPI payments</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-blue-100">UPI and COD with complete security</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-blue-100">Quick and reliable shipping nationwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};