// import { DocumentData, DocumentReference } from 'firebase/firestore';
// import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
// import { createNewNote as createNewNoteFirebase, updateNote as updateNoteFirebase } from '../firebase/firebase';
// import { INote } from '../utils/interfaces';

// interface props {
//     isVisible: boolean;
//     togglePopUp: Function;
// }

// function NewNotePopUp({ isVisible, togglePopUp }: props) {
//     const [docRef, setDocRef] = useState<DocumentReference<DocumentData> | null | unknown>(null);
//     const [docId, setDocId] = useState<string>('');
//     const [isChanged, setIsChanged] = useState<boolean>(false);

//     const [title, setTitle] = useState<string>('');
//     const [content, setContent] = useState<string>('');
//     const [images, setImages] = useState<Array<string>>(new Array<string>());
//     const [color, setColor] = useState<string>('');
//     const [isTickboxes, setIsTickboxes] = useState<boolean>(false);

//     const [isUpdating, setIsUpdating] = useState(false);

//     const [note, setNote] = useState<INote>({
//         title: title,
//         content: content,
//         images: images,
//         color: color,
//         tickboxes: isTickboxes,
//     });

//     const createNewNote = async (): Promise<void> => {
//         const newNote: INote = {
//             title: '',
//             content: '',
//             images: new Array<string>(),
//             color: '',
//             tickboxes: false,
//         };

//         // const noteId: string = await createNewNoteFirebase(newNote);

//         // console.log(noteId);
//         // setDocId(noteId);
//     };

//     const updateNote = async (): Promise<void> => {
//         try {
//             setIsUpdating(true);
//             const updatedNote: INote = {
//                 title: title,
//                 content: content,
//                 images: images,
//                 color: color,
//                 tickboxes: isTickboxes,
//             };
//             setNote(updatedNote);

//             await updateNoteFirebase(docId, updatedNote);

//             setIsUpdating(false);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         let updateInterval: any;
//         if (isChanged) {
//             updateInterval = setInterval(async () => {
//                 try {
//                     await updateNote();
//                     setIsChanged(false);
//                 } catch (error) {
//                     console.error(error);
//                 }
//             }, 2000);
//         }

//         return () => clearInterval(updateInterval);
//     });

//     const handleClose: MouseEventHandler = (e: MouseEvent<HTMLElement>): void => {
//         console.log('Close popup');
//         togglePopUp();
//     };

//     return (
//         <div className={`popUpWrapper ${isVisible ? 'show' : ''}`}>
//             <div className={`popUpContainer ${isVisible ? 'show' : ''}`}>
//                 <p>{isUpdating ? 'updating' : 'saved'}</p>
//                 <div onClick={handleClose} className="closePopUp"></div>
//                 <form>
//                     <div>
//                         <label htmlFor="title">Title</label>
//                         <input
//                             type="text"
//                             name="title"
//                             id="title"
//                             maxLength={100}
//                             placeholder="Title"
//                             onChange={(e) => {
//                                 setTitle(e.currentTarget.value);
//                                 setIsChanged(true);
//                             }}
//                         />
//                     </div>
//                     <div>
//                         <textarea
//                             name="content"
//                             id=""
//                             onChange={(e) => {
//                                 setContent(e.currentTarget.value);
//                                 setIsChanged(true);
//                             }}
//                         ></textarea>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default NewNotePopUp;

export {};
