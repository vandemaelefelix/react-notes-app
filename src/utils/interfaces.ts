import { Timestamp } from 'firebase/firestore';

export interface INote {
    title: string;
    content: string;
    images: Array<string>;
    color: string;
    tickboxes: boolean;
    created: Timestamp;
    modified: Timestamp;
    uid: string;
}

export interface INoteUpdate {
    title: string;
    content: string;
    images: Array<string>;
    color: string;
    tickboxes: boolean;
}
