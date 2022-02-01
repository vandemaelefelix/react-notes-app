import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    User,
    UserCredential,
    signInWithPopup,
    signOut,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth';

import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
    getFirestore,
    doc,
    setDoc,
    Timestamp,
    updateDoc,
} from 'firebase/firestore';
import { INote, INoteUpdate } from '../utils/interfaces';

import { app } from './firebase-config';

const auth = getAuth(app);
const db = getFirestore(app);

// const persistence = async (email: string, password: string) => {
//     setPersistence(auth, browserSessionPersistence)
//         .then(async () => {
//             // Existing and future Auth states are now persisted in the current
//             // session only. Closing the window would clear any existing state even
//             // if a user forgets to sign out.
//             // ...
//             // New sign-in will be persisted with session persistence.
//             // return signInWithEmailAndPassword(auth, email, password);
//             return await logInWithEmailAndPassword(email, password);
//         })
//         .catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//         });
// };

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        console.log(user);
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }

        return user;
    } catch (err: any) {
        console.error(err);
        return err;
    }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const res: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(res.user);
        sessionStorage.setItem('Auth Token', res.user.refreshToken);
        console.log(sessionStorage.getItem('Auth Token'));
        return res.user;
    } catch (err: any) {
        console.error(err);
        return err;
    }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user: User = res.user;
        console.log(user);
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name: name,
            authProvider: 'local',
            email,
        });
        return user;
    } catch (err: any) {
        console.error(err);
        return err;
    }
};

const logout = (): void => {
    signOut(auth);
};

const createNewNote = async ({
    title = '',
    content = '',
    images = [],
    color = '',
    tickboxes = false,
    created = Timestamp.now(),
    modified = Timestamp.now(),
    uid = '',
}: INote): Promise<string> => {
    try {
        const ref = await addDoc(collection(db, 'notes'), {
            title: title,
            content: content,
            images: images,
            color: color,
            tickboxes: tickboxes,
            created: created,
            modified: modified,
            uid: uid,
        });

        return ref.id;
    } catch (error) {
        // return error;
        return 'Something went wrong';
    }
};

const updateNote = async (docId: string, note: INoteUpdate) => {
    try {
        const ref = doc(db, 'notes', docId);
        // const docRef = await setDoc(ref, note);
        const docRef = await updateDoc(ref, {
            title: note.title,
            content: note.content,
            images: note.images,
            color: note.color,
            tickboxes: note.tickboxes,
            modified: Timestamp.now(),
        });

        return docRef;
    } catch (error) {
        return error;
    }
};

const getNotesByUser = async (uid: string): Promise<INote[]> => {
    let notes: INote[] = new Array<INote>();

    const notesRef = collection(db, 'notes');
    const q = query(notesRef, where('uid', '==', uid));

    const querySnapshot = await getDocs(q);

    // const unsub = onSnapshot(doc(db, 'cities', 'SF'), (doc) => {
    //     console.log('Current data: ', doc.data());
    // });

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        notes.push(doc.data() as INote);
    });

    console.log(notes);
    return notes;
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
    createNewNote,
    updateNote,
    getNotesByUser,
};
