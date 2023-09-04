import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    setRegistrationModalVisible,
    setLoginModalVisible,
} from '../features/modalSlice.js';
import { logout, userIsAuthenticated } from '../features/userSlice.js';
import DemoButton from './DemoButton';
import ImageUploader from './ImageUploader.js';
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
                    <button className="registration-button" onClick={showRegistrationModal}>Register</button>
                    {!isAuthenticated ? (
                    <button className="login-button" onClick={showLoginModal}>Login</button>
                    ) : (
                    <button className="logout-button" onClick={handleLogoutUser}>Logout</button>
                    )}
                    <DemoButton />
                </div>
                <ImageUploader />
                <div>
                    <img class="logo-sizing" src="https://closet-app.s3.us-east-2.amazonaws.com/assets/sweatshirt-modified.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLWVhc3QtMSJGMEQCIEOHMumcW%2Bv%2B7npuUeUgKid8Nr6yHrA3ePNhxVc25WB4AiBnvhonuKlH6rb2c9vrwzH%2FRsnk9ACSA1gqivoAqBg2wyrkAghNEAAaDDMwNTUxNDIyNDY2MCIM%2BvLKY95Q%2BKI4GxE%2BKsECGfQD2R4566YOcR2nXkbJLQwI0iMwksU%2FFw94M57ep6WPXP3IJdyaYvBzpQc3WYNtsQznkRv5NalmM4nZZQu4wZ9Vz02WUWHWjGAwRMsp39QKqxTAVemnNo3UHbF8khj52TaOathLJskL%2BMLb%2BtdIvAbCbJnU1FYOvtAIPWY3sTSr%2FOSh8jCKobLae4gtj%2B2pdmaPp%2BgWfIWR3sOthYf3Y1avHT25z%2B8rqC9jDaP2EoSGGQS8aAZxRxoZ0PUcylp8hWt9qppwi06lZtFK%2FEylMslvSY%2B1ITSJwff%2BnYhbI3OnbczHSRW8rD0tFI97IHV%2BW91bmEeo3kTjzZkgGUfe19IaxCqYh1sdoEllbkPlsLTaXB80AbL8JVfQjTQbPhDY1dFdO%2FnAyMwCtpeeyuJfuxq1z0Idb1OTW560yb2%2BtJYWMOb02KcGOrQCMjcU5KQveg7ypj4bvnovc6nKYxq7oBgZ%2FDPf6cB9FJke%2BO8I9%2F7uMEEyaT2qfitbV1oGdVd1aZMXHKgFQajiSChTQ6yVTJQxAkTLf9fAcw4ZyI9FmxScpDKysZ7zGxzH5q8GH8Fs4Y7ISj5ZfK73FxP52on6Jewg6g7IKNHd1Nr7H%2FdF4NVGtn64FDhpt1d9vDSPcYkIE6vG624q5mfMk1Ra1mgGZFp2Xt7YNQgSGHlTbiSZtg5gwJewr53oSDktImkmMuxPR%2BeQQFuS1l8S2f2ImnCpkl2zrgbbEYuN2W%2F5GfzIw4nu%2BeKK745aB5LotaTLFHi0p6G0mXk2ws1295A6VwnjUsaZBzoi31izA%2BtBYjKYwJoRHX%2FYWEiAx9fUGFJpK%2B%2FTnAoD2rRB4M335XE%2BwAQ%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230904T203725Z&X-Amz-SignedHeaders=host&X-Amz-Expires=2400&X-Amz-Credential=ASIAUOIQRDQKFXIUTQG6%2F20230904%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=4ca8d7ab9fb8db88d35c8588bcd79a9ad59abce0164b5623af4c181373e3d180" alt="nav logo" />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;