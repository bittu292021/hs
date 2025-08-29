import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { Product } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: string, product: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'Electronics',
    stock: 0,
    featured: false
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'Electronics',
      stock: 0,
      featured: false
    });
    setIsAddingProduct(false);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 bg-white m-4 rounded-xl shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setIsAddingProduct(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Add Product Form */}
          {isAddingProduct && (
            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price || ''}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Stock Quantity"
                    value={newProduct.stock || ''}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, stock: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <textarea
                  placeholder="Product Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={3}
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newProduct.featured}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded"
                  />
                  <span>Featured Product</span>
                </label>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Add Product</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Manage Products</h3>
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md border">
                {editingProduct?.id === product.id ? (
                  <form onSubmit={handleUpdateProduct} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct(prev => prev ? { ...prev, name: e.target.value } : null)}
                        className="p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct(prev => prev ? { ...prev, price: Number(e.target.value) } : null)}
                        className="p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) => setEditingProduct(prev => prev ? { ...prev, stock: Number(e.target.value) } : null)}
                        className="p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors flex items-center space-x-1"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};