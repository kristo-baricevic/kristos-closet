import { useSelector, useDispatch } from 'react-redux';
import {
    setRegistrationModalVisible,
    setLoginModalVisible,
    logoutUser,
} from '../store/actions.js';
import DemoButton from './DemoButton';

const NavBar = () => {

const isAuthenticated = useSelector((state) => state.isAuthenticated);
const dispatch = useDispatch();

const showRegistrationModal = () => {
    dispatch(setRegistrationModalVisible(true));
};

const showLoginModal = () => {
    dispatch(setLoginModalVisible(true));
};

const handleLogoutUser = () => {
    dispatch(logoutUser());
};

    return (
        <nav className="navbar">
            <ul className="navbar-menu">
            <li>
                <button className="registration-button" onClick={showRegistrationModal}>Register</button>
            </li>
            <li>
                {!isAuthenticated ? (
                <button className="login-button" onClick={showLoginModal}>Login</button>
                ) : (
                <button className="logout-button" onClick={handleLogoutUser}>Logout</button>
                )}
            </li>
            <li>
                <DemoButton />
            </li>
            </ul>
        </nav>
    );
};

export default NavBar;

  