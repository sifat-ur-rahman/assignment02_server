import { Query, Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TUser,
  UserModel,
  UserMethods,
  TOrders,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const FullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First name is required '] },
  lastName: { type: String },
});
const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
const OrdersSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: FullNameSchema },
  age: { type: Number },
  email: { type: String, trim: true, required: true },
  isActive: { type: Boolean },
  hobbies: { type: [String], default: [] },
  address: { type: AddressSchema, required: true },
  orders: { type: [OrdersSchema] },
});
userSchema.methods.isUserExits = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

userSchema.pre(/^find/, function (this: Query<TUser, Document>, next) {
  this.select('-password');
  next();
});
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const userData = this;
  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
export const User = model<TUser, UserModel>('User', userSchema);
