import { FirebaseError } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    User,
    UserCredential,
} from 'firebase/auth';
import { app } from './firebase-config';

const auth = getAuth(app);

const getCurrentUser = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
};

const createUser = async (email: string, password: string) => {
    const authentication = getAuth();
    return await createUserWithEmailAndPassword(authentication, email, password)
        .then((userCredential: UserCredential) => {
            const user: User = userCredential.user;
            return user;
        })
        .catch((error: FirebaseError): FirebaseError => error);
};

const signInUser = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: UserCredential) => {
            const user: User = userCredential.user;
            console.log(user);
        })
        .catch((error: FirebaseError) => {
            const errorCode: string = error.code;
            const errorMessage: string = error.message;

            console.log(`Error code: ${errorCode}
Error message: ${errorMessage}`);
        });
};

export { app, auth, createUser, signInUser as signInWithEmailAndPassword, getCurrentUser };
