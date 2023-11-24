import { z } from 'zod';

const NameValidationSchema = z.object({
  firstName: z.string().min(1).max(25),
  lastName: z.string().min(1).max(25),
});

const AddressValidationSchema = z.object({
  street: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
});
const OrdersValidationSchema = z.object({
  productName: z.string().min(1).max(255),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  fullName: NameValidationSchema,
  password: z.string(),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.array(OrdersValidationSchema).optional().default([]),
});

export default userValidationSchema;
