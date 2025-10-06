import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'preparing' | 'cooking' | 'on-the-way' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryAddress: string;
  estimatedDelivery: string;
  paymentMethod: string;
}

interface OrderHistoryContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number, deliveryAddress: string, paymentMethod: string) => string;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersCount: () => number;
  clearOrderHistory: () => void;
  reorder: (orderId: string) => OrderItem[];
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
};

interface OrderHistoryProviderProps {
  children: ReactNode;
}

export const OrderHistoryProvider: React.FC<OrderHistoryProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (items: CartItem[], total: number, deliveryAddress: string, paymentMethod: string): string => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const orderItems: OrderItem[] = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const newOrder: Order = {
      id: orderId,
      items: orderItems,
      total,
      status: 'preparing',
      orderDate: new Date(),
      deliveryAddress,
      estimatedDelivery: '30-45 minutes',
      paymentMethod,
    };

    setOrders(currentOrders => [newOrder, ...currentOrders]);
    
    // Simulate order status updates
    setTimeout(() => updateOrderStatus(orderId, 'cooking'), 3000);
    setTimeout(() => updateOrderStatus(orderId, 'on-the-way'), 8000);
    setTimeout(() => updateOrderStatus(orderId, 'delivered'), 15000);
    
    return orderId;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrdersCount = (): number => {
    return orders.length;
  };

  const clearOrderHistory = () => {
    setOrders([]);
  };

  const reorder = (orderId: string): OrderItem[] => {
    const order = getOrderById(orderId);
    return order ? order.items : [];
  };

  const value: OrderHistoryContextType = {
    orders,
    addOrder,
    getOrderById,
    updateOrderStatus,
    getOrdersCount,
    clearOrderHistory,
    reorder,
  };

  return (
    <OrderHistoryContext.Provider value={value}>
      {children}
    </OrderHistoryContext.Provider>
  );
};