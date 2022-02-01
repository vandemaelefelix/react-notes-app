import { Timestamp } from 'firebase/firestore';
import { forwardRef, MouseEvent, MouseEventHandler, useEffect, useImperativeHandle, useState } from 'react';
import { createNewNote as createNewNoteFirebase, updateNote as updateNoteFirebase, auth } from '../firebase/firebase';
import { INote, INoteUpdate } from '../utils/interfaces';

interface props {
    isVisible: boolean;
    hidePopUp: Function;
}

const EditNotePopUp = forwardRef(({ isVisible, hidePopUp }: props, ref) => {
    const [docId, setDocId] = useState<string>('');
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [images, setImages] = useState<Array<string>>(new Array<string>());
    const [color, setColor] = useState<string>('');
    const [isTickboxes, setIsTickboxes] = useState<boolean>(false);

    const [isUpdating, setIsUpdating] = useState(false);

    const [isNewNote, setIsNewNote] = useState(false);
    const [selectedNote, setSelectedNote] = useState({} as INote);

    useImperativeHandle(ref, () => ({
        setNewNote: (value: boolean): void => {
            setIsNewNote(value);
        },

        // ? Set input values to current selected note
        setNoteValues: (note: INote): void => {
            if (note) {
                setTitle(note.title);
                setContent(note.content);
                setImages(note.images);
                setColor(note.color);
                setIsTickboxes(note.tickboxes);
                setDocId(note?.id || '');
            }
        },
    }));

    const createNewNote = async (): Promise<void> => {
        if (auth.currentUser?.uid) {
            const timeStamp = Timestamp.now();
            const newNote: INote = {
                title: title,
                content: content,
                images: images,
                color: color,
                tickboxes: isTickboxes,
                created: timeStamp,
                modified: timeStamp,
                uid: auth.currentUser?.uid,
            };

            const noteId: string = await createNewNoteFirebase(newNote);
            setDocId(noteId);
        }
    };

    const updateNote = async (): Promise<void> => {
        try {
            if (isNewNote && docId === '') {
                await createNewNote();
            }
            setIsUpdating(true);

            const updatedNote: INoteUpdate = {
                title: title,
                content: content,
                images: images,
                color: color,
                tickboxes: isTickboxes,
            };

            await updateNoteFirebase(docId, updatedNote);

            setIsUpdating(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let updateInterval: any;
        if (isChanged) {
            updateInterval = setInterval(async () => {
                try {
                    await updateNote();
                    setIsChanged(false);
                } catch (error) {
                    console.error(error);
                }
            }, 2000);
        }

        return () => clearInterval(updateInterval);
    });

    const handleClose: MouseEventHandler = (e: MouseEvent<HTMLElement>): void => {
        hidePopUp();

        // If note has already been saved and close is pressed then update note
        if (!(isNewNote && docId === '')) {
            updateNote();
        }

        // Clean up all state variables and form fields
        setTitle('');
        setContent('');
        setImages(new Array<string>());
        setColor('');
        setIsTickboxes(false);
        setDocId('');
    };

    return (
        <div onClick={handleClose} className={`popUpWrapper ${isVisible ? 'show' : ''}`}>
            <div onClick={(e) => e.stopPropagation()} className={`popUpContainer ${isVisible ? 'show' : ''}`}>
                <p>{isUpdating ? 'updating' : 'saved'}</p>
                <div onClick={handleClose} className="closePopUp"></div>
                <form>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            maxLength={100}
                            placeholder="Title"
                            onChange={(e) => {
                                setTitle(e.currentTarget.value);
                                setIsChanged(true);
                            }}
                            value={title || ''}
                        />
                    </div>
                    <div>
                        <textarea
                            name="content"
                            id=""
                            onChange={(e) => {
                                setContent(e.currentTarget.value);
                                setIsChanged(true);
                            }}
                            value={content || ''}
                        ></textarea>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default EditNotePopUp;
