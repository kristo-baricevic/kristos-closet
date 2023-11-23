import { useSelector, useDispatch } from 'react-redux';
import {
    setRegistrationModalVisible,
    setLoginModalVisible,
} from '../features/modalSlice.js';
import { logout, userIsAuthenticated } from '../features/userSlice.js';
import DemoButton from './DemoButton';
import ImageUploader from './ImageUploader.js';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NavBar = () => {
    // States to handle the menus opening and closing
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);

    const isAuthenticated = useSelector(userIsAuthenticated);
    const dispatch = useDispatch();

    // Close menus on component unmount
    useEffect(() => {
        console.log("useEffect in NavBar");
        setIsUserMenuOpen(false);
        setIsWardrobeOpen(false);
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

    const handleUserIconClick = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleWardrobeIconClick = () => {
        setIsWardrobeOpen(!isWardrobeOpen);
    };

    return (
        <div className="navbar-element-container">
            <nav className="navbar">
                <div
                    className="navbar-buttons-container"
                    onMouseEnter={() => setIsUserMenuOpen(true)}
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                    {isUserMenuOpen ? (
                        <div className="navbar-menu-open-container">
                            <button className="navbar-button-user-open-icon" onClick={handleUserIconClick}>
                                <img
                                    className="user-open-icon-open"
                                    src="https://raw.githubusercontent.com/kristo-baricevic/kristos-closet/master/client/closet-app/src/icons/UserImage.png"
                                    alt="User"
                                />
                            </button>
                            <button className="navbar-button" onClick={showRegistrationModal}>
                                Register
                            </button>
                            {!isAuthenticated ? (
                                <button className="navbar-button" onClick={showLoginModal}>
                                    Login
                                </button>
                            ) : (
                                <button className="navbar-button" onClick={handleLogoutUser}>
                                    Logout
                                </button>
                            )}
                            <DemoButton />
                        </div>
                    ) : (
                        <button className="navbar-button" onClick={handleUserIconClick}>
                            <img
                                className="user-open-icon-closed"
                                src="https://raw.githubusercontent.com/kristo-baricevic/kristos-closet/master/client/closet-app/src/icons/UserImage.png"
                                alt="User"
                            />
                        </button>
                    )}
                </div>

                <div className="image-uploader-navbar-container">
                    <ImageUploader />
                </div>

                <div
                    className="navbar-buttons-container"
                    onMouseEnter={() => setIsWardrobeOpen(true)}
                    onMouseLeave={() => setIsWardrobeOpen(false)}
                >
                    {isWardrobeOpen ? (
                        <div className="navbar-menu-open-container">
                            <button className="navbar-button-user-open-icon" onClick={handleWardrobeIconClick}>
                                <img
                                    className="user-open-icon-open"
                                    src="https://raw.githubusercontent.com/kristo-baricevic/kristos-closet/33c8e3961e096dbe555cf03f576f8c4ea28848cd/client/closet-app/src/wardrobe-modified.png"
                                    alt="User"
                                />
                            </button>
                            <Link to="/" className="navbar-button-menu2">
                                Closet
                            </Link>
                            <Link to="/outfit-view" className="navbar-button-menu2">
                                Outfit
                            </Link>
                            <Link to="/wardrobe" className="navbar-button-menu2">
                                Wardrobe
                            </Link>
                        </div>
                    ) : (
                        <button className="navbar-button" onClick={handleWardrobeIconClick}>
                            <img
                                className="user-open-icon-closed"
                                src="https://raw.githubusercontent.com/kristo-baricevic/kristos-closet/33c8e3961e096dbe555cf03f576f8c4ea28848cd/client/closet-app/src/wardrobe-modified.png"
                                alt="User"
                            />
                        </button>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default NavBar;