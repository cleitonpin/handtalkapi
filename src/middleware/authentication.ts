import { NextFunction, Request, Response } from "express";
import { getAuth, signInWithCustomToken } from "firebase/auth";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

	const { authorization } = req.headers;

	if (!authorization) return res.status(401).json({ message: 'Token not provided' });

	const token = authorization.replace('Bearer', '').trim();

	const auth = getAuth();
	signInWithCustomToken(auth, token)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			req.userId = user.uid;
			return next()
		})
		.catch((error) => {

			return res.status(401).json({ message: 'Token invalid' })
		});
}
