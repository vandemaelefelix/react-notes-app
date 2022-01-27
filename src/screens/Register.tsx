import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { auth, registerWithEmailAndPassword } from '../firebase/firebase';

function Register() {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate('/', { replace: true });
    }, [user, loading, navigate]);

    const handleAuthentication = async () => {
        const user = await registerWithEmailAndPassword(`${firstName} ${lastName}`, email, password);
        console.log(user);
    };

    const handleRegister: MouseEventHandler = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        handleAuthentication();
    };

    return (
        <form>
            <div>
                <label htmlFor="firstname">First name</label>
                <input
                    autoComplete="true"
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First name"
                    value={firstName || ''}
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                />
            </div>

            <div>
                <label htmlFor="lastname">Last name</label>
                <input
                    autoComplete="true"
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last name"
                    value={lastName || ''}
                    onChange={(e) => setLastName(e.currentTarget.value)}
                />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input
                    autoComplete="false"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email || ''}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    autoComplete="false"
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    value={password || ''}
                />
            </div>

            <button onClick={handleRegister}>Register</button>
        </form>
    );
}

export default Register;
