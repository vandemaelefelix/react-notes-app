import { MouseEvent, MouseEventHandler } from 'react';

interface props {
    isVisible: boolean;
    togglePopUp: Function;
}

function NewNotePopUp({ isVisible, togglePopUp }: props) {
    const handleClose: MouseEventHandler = (e: MouseEvent<HTMLElement>): void => {
        console.log('Close popup');
        togglePopUp();
    };

    return (
        <div className={`popUpWrapper ${isVisible ? 'show' : ''}`}>
            <div className={`popUpContainer ${isVisible ? 'show' : ''}`}>
                <div onClick={handleClose} className="closePopUp"></div>
                <form action="">
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" maxLength={100} placeholder="Title" />
                    </div>
                    <div>
                        <textarea name="content" id=""></textarea>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewNotePopUp;
