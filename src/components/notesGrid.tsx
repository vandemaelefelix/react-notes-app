import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db, getNotesByUser } from '../firebase/firebase';
import { INote } from '../utils/interfaces';
import useSnapshot from '../utils/useSnapshot';

function NotesGrid() {
    const [data, setData] = useState<any[]>(new Array());

    useEffect(() => {
        let unsubscribe: any;
        if (auth.currentUser?.uid) {
            console.log(auth.currentUser?.uid);
            const q = query(collection(db, 'notes'), where('uid', '==', auth.currentUser?.uid));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const notes: any = [];
                querySnapshot.forEach((doc) => {
                    notes.push(doc.data());
                });
                console.log(notes);
                // setData(notes);
            });
        }
        console.log(data);
        //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
        return () => unsubscribe();
    }, [data]);

    // const getNotes = async () => {
    //     if (auth.currentUser?.uid) {
    //         const notes = await getNotesByUser(auth.currentUser?.uid);
    //         setNotes(notes);
    //         console.log('succes');
    //     }
    // };

    return (
        <div className="notesGrid">
            {data ? (
                data.map((note: any) => (
                    <div key={Math.random()} className="noteContainer">
                        <p className="noteTitle">{note.title}</p>
                        <p className="noteContent">{note.content}</p>
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
}

export default NotesGrid;
