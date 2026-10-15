export const orders = [
  {
    id: 'SK-100482',
    date: '2026-01-12',
    total: 8912,
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    steps: ['Ordered', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'],
    currentStep: 4,
    items: [
      { name: 'Nike Air Zoom Pegasus', size: '8', color: 'Volt', quantity: 1, price: 8999 },
      { name: 'Adidas Ultraboost', size: '7', color: 'Core Black', quantity: 1, price: 11999 },
    ],
  },
  {
    id: 'SK-100734',
    date: '2026-02-18',
    total: 7399,
    paymentStatus: 'Paid',
    deliveryStatus: 'Shipped',
    steps: ['Ordered', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'],
    currentStep: 2,
    items: [
      { name: 'Puma Velocity Nitro', size: '9', color: 'Puma White', quantity: 1, price: 7399 },
    ],
  },
  {
    id: 'SK-101056',
    date: '2026-03-08',
    total: 12999,
    paymentStatus: 'Paid',
    deliveryStatus: 'Out for Delivery',
    steps: ['Ordered', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'],
    currentStep: 3,
    items: [
      { name: 'New Balance 9060', size: '10', color: 'Grey', quantity: 1, price: 12999 },
    ],
  },
];

export default orders;
