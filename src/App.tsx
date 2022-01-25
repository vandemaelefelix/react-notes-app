import React from 'react';

import Home from './screens/Home';
import { Route, Routes } from 'react-router-dom';

import './styles/main.scss';
import Header from './components/header';
import Footer from './components/footer';

function App() {
    return (
        <div>
            <Header></Header>

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>

            <Footer></Footer>
        </div>
    );
}

export default App;
