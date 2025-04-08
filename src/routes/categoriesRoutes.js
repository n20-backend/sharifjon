
import express from 'express';
import { categoriesController } from '../controller/categoriesController.js';

const categoriesRouter = express.Router();


// CRUD   update
categoriesRouter.post('/', categoriesController.createCategory);

categoriesRouter.get('/', categoriesController.getAllCategories);

categoriesRouter.get('/:id', categoriesController.getCategory);

categoriesRouter.put('/:id', categoriesController.update);

categoriesRouter.delete('/:id', categoriesController.delete);





// categoriesRouter.get('/', categoriesController.getAllUsers);
// categoriesRouter.get('/:id', categoriesController.getOne);
// categoriesRouter.put('/', categoriesController.updateUser);
// categoriesRouter.delete('/:id', categoriesController.deleteUser);






export default categoriesRouter;