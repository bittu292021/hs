import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 2499,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 15,
    featured: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness with this advanced smartwatch featuring heart rate monitoring.',
    price: 4999,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 8,
    featured: true
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable, breathable organic cotton t-shirt perfect for everyday wear.',
    price: 799,
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    stock: 25,
    featured: false
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    description: 'Eco-friendly stainless steel water bottle that keeps drinks cold for 24 hours.',
    price: 1299,
    image: 'https://images.pexels.com/photos/4246123/pexels-photo-4246123.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Lifestyle',
    stock: 20,
    featured: false
  },
  {
    id: '5',
    name: 'Professional Backpack',
    description: 'Durable backpack with laptop compartment and multiple pockets for professionals.',
    price: 3299,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Accessories',
    stock: 12,
    featured: true
  },
  {
    id: '6',
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 1899,
    image: 'https://images.pexels.com/photos/4526403/pexels-photo-4526403.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 18,
    featured: false
  }
];

export const categories = ['All', 'Electronics', 'Clothing', 'Lifestyle', 'Accessories'];