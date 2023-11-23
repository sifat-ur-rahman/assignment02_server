import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/POST/api/users', UserControllers.createUser);
router.get('/GET/api/users', UserControllers.getAllUser);
router.get('/GET/api/users/:userId', UserControllers.getOneUser);
router.delete('/DELETE/api/users/:userId', UserControllers.deleteOneUser);

export const UserRoute = router;
