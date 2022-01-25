import { Request, Response } from "express";
import { admin } from "../app";
import bcrypt from 'bcrypt';
import { firebaseAuth } from "../config/firebase";
import { v4 as uuid } from 'uuid'

class UserController {
	async store(req: Request, res: Response) {
		const { email, password, role = "client", name, id } = req.body;
		const db = admin.database();
		const encryptedPass = await bcrypt.hash(password, 10);

		const PERMISSIONS = {
			client: {
				create: false,
				read: true,
				update: false,
				delete: false
			},
			admin: {
				create: true,
				read: true,
				update: true,
				delete: true
			}
		}

		db.ref("/users").child(uuid()).set({
			id,
			email,
			password: encryptedPass,
			role,
			permissions: PERMISSIONS[role],
			name,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		});

		firebaseAuth.createUserWithEmailAndPassword(firebaseAuth.getAuth(), email, password)
			.then(async ({ user }) => {
				const customToken = await admin.auth().createCustomToken(uuid());

				return res.json({ user, customToken });
			})
			.catch(err => {
				const errorCode = err.code;
				const errorMessage = err.message;

				return res.status(500).json({ errorCode, errorMessage });
			})
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		firebaseAuth.signInWithEmailAndPassword(firebaseAuth.getAuth(), email, password)
			.then(async ({ user }) => {
				const customToken = await admin.auth().createCustomToken(uuid());

				return res.json({ user, customToken });
			})
			.catch(err => {
				const errorCode = err.code;
				const errorMessage = err.message;

				return res.status(500).json({ errorCode, errorMessage });
			})
	}
}

export default new UserController();