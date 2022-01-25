import express from 'express';

import authMiddleware from './middleware/authentication';
import PostsController from './controllers/PostsController';
import UserController from './controllers/UserController';

// const auth = firebaseAuth.getAuth();
const routes = express.Router();

routes.post('/login', UserController.login)
routes.post('/signup', UserController.store)

routes.use(authMiddleware)
routes.post('/product', PostsController.createPost)
routes.get('/product', PostsController.getAllPosts)

export { routes }