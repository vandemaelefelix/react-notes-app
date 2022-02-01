import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import NotesGrid from '../components/notesGrid';
import { auth } from '../firebase/firebase';

function Home() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (!user) navigate('/login');
        console.log(user);
    }, [user, loading]);

    return (
        <main className="homeMain">
            <NotesGrid></NotesGrid>
        </main>
    );
}

export default Home;
