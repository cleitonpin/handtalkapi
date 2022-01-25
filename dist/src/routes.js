"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./middleware/authentication"));
const PostsController_1 = __importDefault(require("./controllers/PostsController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
// const auth = firebaseAuth.getAuth();
const routes = express_1.default.Router();
exports.routes = routes;
routes.post('/login', UserController_1.default.login);
routes.post('/signup', UserController_1.default.store);
routes.use(authentication_1.default);
routes.post('/product', PostsController_1.default.createPost);
routes.get('/product', PostsController_1.default.getAllPosts);
