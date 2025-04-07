import express from 'express';
import { userController } from '../controller/userController.js';

const userRouter = express.Router();


// CRUD
userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getOne);
userRouter.put('/', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);






export default userRouter;