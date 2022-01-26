import { useState } from 'react';

function NotesGrid() {
    const [notes, setNotes] = useState([
        {
            title: 'Note 1',
            content: 'This is the first note. This is the first note. This is the first note. This is the first note.',
        },
        {
            title: 'Note 2',
            content: 'This is the second note.',
        },
        {
            title: 'Note 1',
            content: 'This is the first note.',
        },
        {
            title: 'Note 2',
            content: 'This is the second note.',
        },
        {
            title: 'Note 1',
            content: 'This is the first note.',
        },
        {
            title: 'Note 2',
            content: 'This is the second note.',
        },
        {
            title: 'Note 1',
            content: 'This is the first note.',
        },
        {
            title: 'Note 2',
            content: 'This is the second note.',
        },
        {
            title: 'Note 1',
            content: 'This is the first note.',
        },
        {
            title: 'Note 2',
            content: 'This is the second note.',
        },
        {
            title: 'Note 1',
            content: 'This is the first note.',
        },
        {
            title: 'Note 2',
            content: 'This is the second note.',
        },
    ]);

    return (
        <div className="notesGrid">
            {notes.map((note) => (
                <div key={Math.random()} className="noteContainer">
                    <p className="noteTitle">{note.title}</p>
                    <p className="noteContent">{note.content}</p>
                </div>
            ))}
        </div>
    );
}

export default NotesGrid;
