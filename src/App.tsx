import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ProductGrid } from './components/ProductGrid';
import { CategoryFilter } from './components/CategoryFilter';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderHistory } from './components/OrderHistory';
import { AdminPanel } from './components/AdminPanel';
import { useCart } from './hooks/useCart';
import { useOrders } from './hooks/useOrders';
import { products as initialProducts, categories } from './data/products';
import { Product } from './types';
import { Settings } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  } = useCart();

  const { orders, addOrder } = useOrders();

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (orderData: Parameters<typeof addOrder>[0]) => {
    addOrder(orderData);
    setIsCheckoutOpen(false);
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={getCartItemCount()}
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => setIsOrderHistoryOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      <main>
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Products */}
          <FeaturedProducts
            products={products}
            onAddToCart={addToCart}
          />

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Search Results for "{searchQuery}" ({filteredProducts.length})
              </h2>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              onAddToCart={addToCart}
            />
          )}
        </div>
      </main>

      {/* Admin Button */}
      <button
        onClick={() => setIsAdminPanelOpen(true)}
        className="fixed bottom-6 left-6 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition-colors"
        title="Admin Panel"
      >
        <Settings className="h-6 w-6" />
      </button>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">ShopHub</h3>
            <p className="text-gray-300 mb-4">Your trusted online shopping destination</p>
            <div className="flex justify-center space-x-6 text-sm">
              <span>UPI Payments Accepted</span>
              <span>•</span>
              <span>Fast Delivery</span>
              <span>•</span>
              <span>24/7 Support</span>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm">© 2025 ShopHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        total={getCartTotal()}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={getCartTotal()}
        onOrderComplete={handleOrderComplete}
        onClearCart={clearCart}
      />

      <OrderHistory
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
}

export default App;