import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    setRegistrationModalVisible,
    setLoginModalVisible,
} from '../features/modalSlice.js';
import { logout, userIsAuthenticated } from '../features/userSlice.js';
import DemoButton from './DemoButton';
import ImageUploader from './ImageUploader.js';

const NavBar = () => {

const isAuthenticated = useSelector(userIsAuthenticated);
const dispatch = useDispatch();
const [isCollapsed, setIsCollapsed] = useState(false);

  // Add an event listener to handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position, for example, 100px from the top
      if (window.scrollY > 100) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Attach the event listener to the window
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

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

  