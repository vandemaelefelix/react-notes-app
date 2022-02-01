import { logout } from '../firebase/firebase';
import SearchBar from './searchbar';

function Header() {
    return (
        <header className="header">
            <SearchBar></SearchBar>
            <button className="logoutButton" onClick={logout}>
                Log out
            </button>
        </header>
    );
}

export default Header;
