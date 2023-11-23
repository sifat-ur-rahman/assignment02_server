import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (Data: TUser) => {
  const result = await User.create(Data);

  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const getOneUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId }, { password: 0 });
  return result;
};
export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getOneUserFromDB,
};
