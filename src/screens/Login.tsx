import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate('/');
    }, [user, loading]);

    return (
        <form>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    autoComplete="true"
                    type="text"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    autoComplete="true"
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
            </div>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    logInWithEmailAndPassword(email, password);
                }}
            >
                Login
            </button>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    signInWithGoogle();
                }}
            >
                Sign in with google
            </button>
        </form>
    );
}

export default Login;
