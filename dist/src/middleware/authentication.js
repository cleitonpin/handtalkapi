"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).json({ message: 'Token not provided' });
    const token = authorization.replace('Bearer', '').trim();
    const auth = (0, auth_1.getAuth)();
    (0, auth_1.signInWithCustomToken)(auth, token)
        .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        req.userId = user.uid;
        return next();
    })
        .catch((error) => {
        return res.status(401).json({ message: 'Token invalid' });
    });
}
exports.default = authMiddleware;
