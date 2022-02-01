function NewNoteButton({ handleNewNote }: any) {
    return (
        <button onClick={handleNewNote} className="newNoteButton">
            <svg className="cross" viewBox="0 0 42.477 42.477">
                <path
                    d="M0,37.477a5,5,0,0,1-5-5V0A5,5,0,0,1,0-5,5,5,0,0,1,5,0V32.477A5,5,0,0,1,0,37.477Z"
                    transform="translate(21.239 5)"
                    fill="#363a4d"
                />
                <path
                    d="M0,37.477a5,5,0,0,1-5-5V0A5,5,0,0,1,0-5,5,5,0,0,1,5,0V32.477A5,5,0,0,1,0,37.477Z"
                    transform="translate(37.477 21.239) rotate(90)"
                    fill="#363a4d"
                />
            </svg>
        </button>
    );
}

export default NewNoteButton;
