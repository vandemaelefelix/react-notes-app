import { MouseEvent, MouseEventHandler } from 'react';
import { INote } from '../utils/interfaces';

interface Props {
    data: any;
}

function Note({ data }: Props) {
    const handleNoteClick: MouseEventHandler = (e: MouseEvent<HTMLElement>) => {
        console.log(e);
        console.log(data);
        console.log(typeof data);
    };

    return (
        <div
            onClick={handleNoteClick}
            key={Math.random()}
            style={{ backgroundColor: data.color }}
            className="noteContainer"
        >
            <p className="noteTitle">{data.title}</p>
            <p className="noteContent">{data.content}</p>
        </div>
    );
}

export default Note;