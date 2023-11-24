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
  const result = await User.findOne({ userId });
  return result;
};
const updateUserFromDB = async (
  userId: string,
  updatedUserData: TUser,
): Promise<TUser | null> => {
  const result = await User.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
    runValidators: true,
  });

  return result;
};
const updateUserOrderFromDB = async (
  userId: string,
  updatedOrderData: TUser,
): Promise<TUser | null> => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $addToSet: { orders: updatedOrderData } },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};
const deleteOneUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId: userId });
  return result;
};
export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getOneUserFromDB,
  deleteOneUserFromDB,
  updateUserFromDB,
  updateUserOrderFromDB,
};
