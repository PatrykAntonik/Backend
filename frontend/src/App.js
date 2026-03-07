import React, {useEffect, useRef} from 'react';
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import DonationsList from "./components/Donations/Hospitals/DonationsList";
import DonationDetail from "./components/Donations/DonationDetail";
import Container from "@mui/material/Container";
import {HashRouter, Routes, Route, useLocation} from "react-router-dom";
import Login from "./components/UserLogins/Login";
import Register from "./components/UserLogins/Register";
import UserInfo from "./components/UserLogins/UserInfo";
import UserDonations from "./components/Donations/Donors/UserDonations";
import Protect_user from "./utils/protect_user";
import DonorsList from "./components/Donations/Hospitals/DonorsList";
import Questions from "./components/Donations/Questions";
import CreateDonation from "./components/Donations/Donors/CreateDonation";
import Contact from "./components/Contact";
import backgroundImage from './static/background.webp';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';

function AppContent() {
    const location = useLocation();
    const mainRef = useRef(null);

    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.focus();
        }
    }, [location.pathname]);

    return (
        <>
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <Header/>
            <Container
                component="main"
                id="main-content"
                tabIndex={-1}
                ref={mainRef}
                sx={{'&:focus': {outline: 'none'}}}
            >
                <Routes>
                    <Route path='' element={<HomePage/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/questions' element={<Questions/>}/>
                    <Route path="/users" element={
                        <Protect_user>
                            <DonorsList/>
                        </Protect_user>
                    }/>
                    <Route path="/account" element={
                        <Protect_user>
                            <UserInfo/>
                        </Protect_user>
                    }/>
                    <Route path='/donation' element={
                        <Protect_user>
                            <DonationsList/>
                        </Protect_user>
                    }/>
                    <Route path='/donation/:id' element={
                        <Protect_user>
                            <DonationDetail/>
                        </Protect_user>
                    }/>
                    <Route path='/donation/mydonations' element={
                        <Protect_user>
                            <UserDonations/>
                        </Protect_user>
                    }/>
                    <Route path='/donation/create' element={
                        <Protect_user>
                            <CreateDonation/>
                        </Protect_user>
                    }/>
                </Routes>
            </Container>
        </>
    );
}

function App() {
    useEffect(() => {
        document.body.style.backgroundImage = `url('${backgroundImage}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';

        return () => {
            document.body.style.background = null;
        };
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
                <AppContent/>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
