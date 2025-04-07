import express from 'express';
import { userController } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getOne);
userRouter.put('/', userController.updateUser);








// router.get('/', (req, res) => {

// });

// router.get('/:id', (req, res) => {
//     const userId = req.params.id;
// });


// router.put('/:id', (req, res) => {
//     const userId = req.params.id;
//     const updatedUser = req.body;
// });

// router.delete('/:id', (req, res) => {
//     const userId = req.params.id;
// });

export default userRouter;