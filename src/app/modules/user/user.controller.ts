import { Request, Response } from 'express';
import { UserService } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    //data validation using zod
    const zodParserData = userValidationSchema.parse(userData);
    const result = await UserService.createUserIntoDB(zodParserData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getOneUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });

    if (!result) {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const result = await UserService.updateUserFromDB(userId, updatedUserData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
      err,
    });
  }
};
const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await UserService.deleteOneUserFromDB(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const result = await UserService.updateUserOrderFromDB(
      userId,
      updatedUserData,
    );
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
      err,
    });
  }
};

const getOneUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getOneUserOrderFromDB(userId);
    const orders = result?.orders;
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders },
    });

    if (!result) {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const getOneUserOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getOneUserOrderFromDB(userId);
    const orders = result?.orders;
    if (orders) {
      let calculatedPrice = 0;
      for (let i = 0; i < orders.length; i++) {
        const element = orders[i];
        calculatedPrice += element.price * element.quantity;
      }

      const totalPrice = Number(calculatedPrice.toFixed(2));
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: { totalPrice },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getOneUser,
  deleteOneUser,
  updateUser,
  updateUserOrder,
  getOneUserOrder,
  getOneUserOrderPrice,
};
