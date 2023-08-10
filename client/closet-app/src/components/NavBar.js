import { useSelector, useDispatch } from 'react-redux';
import {
    setRegistrationModalVisible,
    setLoginModalVisible,
    logoutUser,
    loginAnonymous,
} from '../store/actions.js';

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

const handleLoginAnonymous = () => {
    dispatch(loginAnonymous());
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
                <button className="demo-button" onClick={handleLoginAnonymous}>Demo</button>
            </li>
            </ul>
        </nav>
    );
};

export default NavBar;

  