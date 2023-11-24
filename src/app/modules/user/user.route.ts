import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/api/users', UserControllers.createUser);
router.get('/api/users', UserControllers.getAllUser);
router.get('/api/users/:userId', UserControllers.getOneUser);
router.delete('/api/users/:userId', UserControllers.deleteOneUser);
router.put('/api/users/:userId', UserControllers.updateUser);
router.put('/api/users/:userId/orders', UserControllers.updateUserOrder);
router.get('/api/users/:userId/orders', UserControllers.getOneUserOrder);
router.get(
  '/api/users/:userId/orders/total-price',
  UserControllers.getOneUserOrderPrice,
);
export const UserRoute = router;
