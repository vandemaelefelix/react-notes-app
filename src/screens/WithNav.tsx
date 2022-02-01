import React, { ForwardRefExoticComponent, useRef, useState } from 'react';
import { Outlet } from 'react-router';
import EditNotePopUp from '../components/editNotePopUp';
import Header from '../components/header';
import NewNoteButton from '../components/newNoteButton';

function WithNav() {
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

    return (
        <>
            <Header />
            <Outlet />
            {/* <NewNoteButton handleNewNote={handleNewNote}></NewNoteButton>
            <EditNotePopUp
                hidePopUp={hideEditNotePopUp}
                isVisible={isEditNotePopUpVisible}
                ref={popUpCreateNewNote}
            ></EditNotePopUp> */}
        </>
    );
}

export default WithNav;
