import React, { useState } from 'react';
import { X, CreditCard, Smartphone } from 'lucide-react';
import { CartItem, Customer, Order } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onOrderComplete: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  onClearCart: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  isOpen,
  onClose,
  cart,
  total,
  onOrderComplete,
  onClearCart
}) => {
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      pincode: ''
    }
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpiQr, setShowUpiQr] = useState(false);

  const upiId = '7644892392@ybl';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'upi') {
      setShowUpiQr(true);
      // Simulate UPI payment processing
      setTimeout(() => {
        completeOrder();
      }, 3000);
    } else {
      // Cash on Delivery
      setTimeout(() => {
        completeOrder();
      }, 1000);
    }
  };

  const completeOrder = () => {
    const order: Omit<Order, 'id' | 'createdAt'> = {
      items: cart,
      total,
      status: 'confirmed',
      paymentMethod: paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery',
      shippingAddress: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address.street,
        city: customer.address.city,
        pincode: customer.address.pincode
      }
    };

    onOrderComplete(order);
    onClearCart();
    setIsProcessing(false);
    setShowUpiQr(false);
    onClose();
    
    // Show success message
    alert('Order placed successfully! You will receive a confirmation shortly.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {showUpiQr ? (
            <div className="text-center py-8">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl">
                <Smartphone className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">UPI Payment</h3>
                <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                  <p className="text-lg font-mono font-semibold text-gray-800">{upiId}</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">₹{total.toLocaleString()}</p>
                </div>
                <p className="text-gray-600 mb-4">
                  Scan QR code or pay to the UPI ID above
                </p>
                <div className="animate-pulse bg-gray-200 h-48 w-48 mx-auto rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">QR Code Here</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Processing payment... Please complete the transaction in your UPI app.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={customer.name}
                    onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={customer.email}
                    onChange={(e) => setCustomer(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customer.phone}
                    onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={customer.address.pincode}
                    onChange={(e) => setCustomer(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, pincode: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <textarea
                  placeholder="Complete Address"
                  value={customer.address.street}
                  onChange={(e) => setCustomer(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, street: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-4"
                  rows={3}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={customer.address.city}
                  onChange={(e) => setCustomer(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, city: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-4"
                  required
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'upi')}
                      className="text-blue-600"
                    />
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-5 w-5 text-green-600" />
                      <span>UPI Payment (Recommended)</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'cod')}
                      className="text-blue-600"
                    />
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-orange-600" />
                      <span>Cash on Delivery</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Place Order - ₹${total.toLocaleString()}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};