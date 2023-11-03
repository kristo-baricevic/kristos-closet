import { useSelector, useDispatch } from 'react-redux';
import {
    setRegistrationModalVisible,
    setLoginModalVisible,
} from '../features/modalSlice.js';
import { logout, userIsAuthenticated } from '../features/userSlice.js';
import DemoButton from './DemoButton';
import ImageUploader from './ImageUploader.js';
import { Link } from 'react-router-dom';


// import ImageUploader from './ImageUploader.js';

const NavBar = () => {

    const isAuthenticated = useSelector(userIsAuthenticated);
    const dispatch = useDispatch();

    const showRegistrationModal = () => {
        dispatch(setRegistrationModalVisible(true));
    };

    const showLoginModal = () => {
        dispatch(setLoginModalVisible(true));
    };

    const handleLogoutUser = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar">
            <div className="navbar-menu">
                <div class="navbar-buttons-container">
                    <button className="navbar-button" onClick={showRegistrationModal}>Register</button>
                    {!isAuthenticated ? (
                    <button className="navbar-button" onClick={showLoginModal}>Login</button>
                    ) : (
                    <button className="navbar-button" onClick={handleLogoutUser}>Logout</button>
                    )}
                    <DemoButton />
                </div>
                    <ImageUploader />
                <div>
                    <Link to="/" className="logo">
                        <img class="logo-sizing" src="https://raw.githubusercontent.com/kristo-baricevic/kristos-closet/33c8e3961e096dbe555cf03f576f8c4ea28848cd/client/closet-app/src/wardrobe-modified.png" alt="nav logo" />
                    </Link>
                </div>
            </div>
            <div class="navbar-extended-buttons">
                <Link to="/wardrobe" className="view-wardrobe-button">
                    View Wardrobe
                </Link>
                <Link to="/outfit-view" className="view-outfit-button">
                    View Outfit
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;