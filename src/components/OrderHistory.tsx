import React from 'react';
import { Package, Clock, CheckCircle, Truck, X } from 'lucide-react';
import { Order } from '../types';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <Package className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-4xl bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Package className="h-6 w-6 mr-3" />
              Order History
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-gray-50 rounded-xl p-6 shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                        <p className="text-gray-600">{order.createdAt.toLocaleDateString()}</p>
                        {order.trackingId && (
                          <p className="text-sm text-blue-600">Tracking: {order.trackingId}</p>
                        )}
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="font-semibold capitalize">{order.status}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-600">Payment: {order.paymentMethod}</p>
                        <p className="text-sm text-gray-600">
                          Shipping to: {order.shippingAddress.name}, {order.shippingAddress.city}
                        </p>
                      </div>
                      <span className="text-xl font-bold text-blue-600">₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};