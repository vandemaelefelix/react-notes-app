import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, getNotesByUser } from '../firebase/firebase';
import { INote } from '../utils/interfaces';
import useSnapshot from '../utils/useSnapshot';
import EditNotePopUp from './editNotePopUp';
import NewNoteButton from './newNoteButton';
import Note from './note';

function NotesGrid() {
    const [data, setData] = useState<any[]>(new Array());
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (!user || user === null) navigate('/login');
        console.log(user);

        const unsubscribe = getData();

        return () => unsubscribe();
    }, [user, loading]);

    useEffect(() => {
        const unsubscribe = getData();
        //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
        return () => unsubscribe();
    }, []);

    const getData = () => {
        let unsubscribe: any;
        if (user?.uid) {
            console.log(user?.uid);
            const q = query(collection(db, 'notes'), where('uid', '==', user?.uid));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const notes: any = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.id);
                    const note = doc.data();
                    note['id'] = doc.id;
                    notes.push(note);
                });
                setData(notes);
                console.log(notes);
            });
        }
        return unsubscribe;
    };

    // TODO: ----------------------------------------

    const popUpCreateNewNote = useRef<any>();
    const [isEditNotePopUpVisible, setIsEditNotePopUpVisible] = useState<boolean>(false);

    const hideEditNotePopUp = (): void => {
        setIsEditNotePopUpVisible(false);
    };
    const showEditNotePopUp = (): void => {
        setIsEditNotePopUpVisible(true);
    };

    const handleNewNote = (e: any) => {
        console.log('showing popup');

        if (popUpCreateNewNote.current) {
            popUpCreateNewNote.current.setNewNote(true);
            showEditNotePopUp();
        }
    };

    const handleNoteClick = (note: INote) => {
        popUpCreateNewNote.current.setNoteValues(note);
        showEditNotePopUp();
    };

    // TODO: ----------------------------------------

    return (
        <div className="notesGrid">
            {data ? (
                data.map((note: INote) => <Note key={note.id} data={note} handleClick={handleNoteClick}></Note>)
            ) : (
                <></>
            )}

            <NewNoteButton handleNewNote={handleNewNote}></NewNoteButton>
            <EditNotePopUp
                hidePopUp={hideEditNotePopUp}
                isVisible={isEditNotePopUpVisible}
                ref={popUpCreateNewNote}
            ></EditNotePopUp>
        </div>
    );
}

export default NotesGrid;
