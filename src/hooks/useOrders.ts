import { useState, useEffect } from 'react';
import { Order } from '../types';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved).map((order: any) => ({
      ...order,
      createdAt: new Date(order.createdAt)
    })) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date(),
      trackingId: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return {
    orders,
    addOrder,
    updateOrderStatus
  };
};