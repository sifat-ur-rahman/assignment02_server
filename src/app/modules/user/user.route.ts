import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/api/users', UserControllers.createUser);
router.get('/api/users', UserControllers.getAllUser);
router.get('/api/users/:userId', UserControllers.getOneUser);
router.delete('/api/users/:userId', UserControllers.deleteOneUser);

export const UserRoute = router;
