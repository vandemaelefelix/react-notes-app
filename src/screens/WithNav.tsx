import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Header from '../components/header';
import NewNoteButton from '../components/newNoteButton';
import NewNotePopUp from '../components/newNotePopUp';

function WithNav() {
    const [isNewNotePopUpVisible, setIsNewNotePopUpVisible] = useState(false);

    const handleNewNote = (e: any) => {
        console.log('button clicked');
        console.log(e.currentTarget);
        toggleNewNotePopUp();
    };

    const toggleNewNotePopUp = () => {
        setIsNewNotePopUpVisible(!isNewNotePopUpVisible);
    };

    return (
        <>
            <Header />
            <Outlet />
            <NewNotePopUp togglePopUp={toggleNewNotePopUp} isVisible={isNewNotePopUpVisible}></NewNotePopUp>
            <NewNoteButton handleNewNote={handleNewNote}></NewNoteButton>
        </>
    );
}

export default WithNav;
