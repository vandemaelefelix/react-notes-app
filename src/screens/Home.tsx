import { useEffect, useState } from 'react';
import NotesGrid from '../components/notesGrid';
import { getCurrentUser } from '../firebase/firebase';

function Home() {
    const [user, setUser] = useState(getCurrentUser);

    useEffect(() => {
        console.log(user);
    }, []);

    return (
        <main className="homeMain">
            <NotesGrid></NotesGrid>
        </main>
    );
}

export default Home;
