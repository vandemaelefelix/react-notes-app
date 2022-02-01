import Home from './screens/Home';
import { Route, Routes } from 'react-router-dom';

import './styles/main.scss';
import Login from './screens/Login';
import WithOutNav from './screens/WithOutNav';
import WithNav from './screens/WithNav';
import Register from './screens/Register';

function App() {
    return (
        <div>
            <Routes>
                <Route element={<WithNav />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route element={<WithOutNav />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
