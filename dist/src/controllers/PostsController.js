"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class PostsController {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, summary, type, description, author, id } = req.body;
                const db = app_1.admin.database();
                db.ref("/products").child(id).set({
                    author,
                    title,
                    summary,
                    type,
                    description,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                return res.json({
                    message: "Product created successfully"
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Something went wrong"
                });
            }
        });
    }
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = app_1.admin.database();
                const postsRef = db.ref("/products");
                postsRef.orderByKey().limitToFirst(2).on('value', snapshot => {
                    const data = snapshot.val();
                    const posts = Object.keys(data).map(key => {
                        return Object.assign({ id: key }, data[key]);
                    });
                    return res.json(posts);
                });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({
                    message: "Something went wrong"
                });
            }
        });
    }
}
exports.default = new PostsController();
