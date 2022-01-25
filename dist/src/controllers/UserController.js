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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const bcrypt_1 = __importDefault(require("bcrypt"));
const firebase_1 = require("../config/firebase");
const uuid_1 = require("uuid");
class UserController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role = "client", name, id } = req.body;
            const db = app_1.admin.database();
            const encryptedPass = yield bcrypt_1.default.hash(password, 10);
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
            };
            db.ref("/users").child((0, uuid_1.v4)()).set({
                id,
                email,
                password: encryptedPass,
                role,
                permissions: PERMISSIONS[role],
                name,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            firebase_1.firebaseAuth.createUserWithEmailAndPassword(firebase_1.firebaseAuth.getAuth(), email, password)
                .then(({ user }) => __awaiter(this, void 0, void 0, function* () {
                const customToken = yield app_1.admin.auth().createCustomToken((0, uuid_1.v4)());
                return res.json({ user, customToken });
            }))
                .catch(err => {
                const errorCode = err.code;
                const errorMessage = err.message;
                return res.status(500).json({ errorCode, errorMessage });
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            firebase_1.firebaseAuth.signInWithEmailAndPassword(firebase_1.firebaseAuth.getAuth(), email, password)
                .then(({ user }) => __awaiter(this, void 0, void 0, function* () {
                const customToken = yield app_1.admin.auth().createCustomToken((0, uuid_1.v4)());
                return res.json({ user, customToken });
            }))
                .catch(err => {
                const errorCode = err.code;
                const errorMessage = err.message;
                return res.status(500).json({ errorCode, errorMessage });
            });
        });
    }
}
exports.default = new UserController();
