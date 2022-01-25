import { getDatabase } from 'firebase/database'
import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID
};

// authentication with

const appFirebase = firebase.initializeApp(firebaseConfig);
const database = getDatabase(appFirebase);

export { firebaseAuth, appFirebase, database };