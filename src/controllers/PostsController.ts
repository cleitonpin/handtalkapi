import { Response, Request } from "express";
import { admin } from "../app";

class PostsController {

	async createPost(req: Request, res: Response) {
		try {
			const { title, summary, type, description, author, id } = req.body;
			const db = admin.database();

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
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: "Something went wrong"
			});
		}
	}

	async getAllPosts(req: Request, res: Response) {
		try {
			const db = admin.database();
			const postsRef = db.ref("/products");

			postsRef.orderByKey().limitToFirst(2).on('value', snapshot => {
				const data = snapshot.val();
				const posts = Object.keys(data).map(key => {
					return {
						id: key,
						...data[key]
					}
				});

				return res.json(posts);
			})
		} catch (e) {
			console.log(e);
			return res.status(500).json({
				message: "Something went wrong"
			});
		}

	}
}

export default new PostsController();