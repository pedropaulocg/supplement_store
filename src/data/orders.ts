import { Order } from "@/types";
import { customers } from "./customers";
import { products } from "./products";

export const orders: Order[] = [
  {
    id: 'order-1',
    customer: customers[0],
    items: [
      { product: products[3], quantity: 2 },
      { product: products[1], quantity: 1 }
    ],
    total: 74.97,
    status: 'pending',
    createdAt: new Date('2025-09-01T08:30:00Z'),
    updatedAt: new Date('2025-09-02T10:00:00Z')
  },
  {
    id: 'order-2',
    customer: customers[1],
    items: [
      { product: products[4], quantity: 1 },
      { product: products[5], quantity: 1 }
    ],
    total: 62.98,
    status: 'shipped',
    createdAt: new Date('2025-08-28T12:15:00Z'),
    updatedAt: new Date('2025-08-29T09:45:00Z')
  },
  {
    id: 'order-3',
    customer: customers[2],
    items: [
      { product: products[6], quantity: 1 },
      { product: products[8], quantity: 1 },
      { product: products[0], quantity: 1 }
    ],
    total: 102.97,
    status: 'delivered',
    createdAt: new Date('2025-08-15T14:00:00Z'),
    updatedAt: new Date('2025-08-18T16:20:00Z')
  },
  {
    id: 'order-4',
    customer: customers[3],
    items: [
      { product: products[12], quantity: 3 }
    ],
    total: 65.97,
    status: 'cancelled',
    createdAt: new Date('2025-09-03T11:10:00Z'),
    updatedAt: new Date('2025-09-03T11:10:00Z')
  },
  {
    id: 'order-5',
    customer: customers[4],
    items: [
      { product: products[13], quantity: 2 },
      { product: products[14], quantity: 1 }
    ],
    total: 70.97,
    status: 'delivered',
    createdAt: new Date('2025-08-20T09:30:00Z'),
    updatedAt: new Date('2025-08-22T10:45:00Z')
  },
  {
    id: 'order-6',
    customer: customers[5],
    items: [
      { product: products[9], quantity: 1 },
      { product: products[10], quantity: 1 }
    ],
    total: 42.98,
    status: 'shipped',
    createdAt: new Date('2025-09-05T13:25:00Z'),
    updatedAt: new Date('2025-09-06T08:00:00Z')
  },
  {
    id: 'order-7',
    customer: customers[6],
    items: [
      { product: products[7], quantity: 2 }
    ],
    total: 71.98,
    status: 'pending',
    createdAt: new Date('2025-09-07T07:55:00Z'),
    updatedAt: new Date('2025-09-07T07:55:00Z')
  },
  {
    id: 'order-8',
    customer: customers[7],
    items: [
      { product: products[3], quantity: 1 },
      { product: products[4], quantity: 1 }
    ],
    total: 64.98,
    status: 'delivered',
    createdAt: new Date('2025-08-10T10:20:00Z'),
    updatedAt: new Date('2025-08-13T14:30:00Z')
  },
  {
    id: 'order-9',
    customer: customers[8],
    items: [
      { product: products[11], quantity: 1 },
      { product: products[14], quantity: 2 }
    ],
    total: 62.97,
    status: 'shipped',
    createdAt: new Date('2025-08-25T15:45:00Z'),
    updatedAt: new Date('2025-08-26T09:15:00Z')
  },
  {
    id: 'order-10',
    customer: customers[9],
    items: [
      { product: products[2], quantity: 3 }
    ],
    total: 53.97,
    status: 'cancelled',
    createdAt: new Date('2025-09-02T16:00:00Z'),
    updatedAt: new Date('2025-09-02T16:00:00Z')
  }
];
