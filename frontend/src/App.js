import React, {useEffect} from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import DonationsList from "./components/Donations/Hospitals/DonationsList";
import DonationDetail from "./components/Donations/DonationDetail";
import Container from "@mui/material/Container";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/UserLogins/Login";
import Register from "./components/UserLogins/Register";
import UserInfo from "./components/UserLogins/UserInfo";
import UserDonations from "./components/Donations/Users/UserDonations";
import Protect_user from "./utils/protect_user";
import DonorsList from "./components/Donations/Hospitals/DonorsList";
import Questions from "./components/Donations/Questions";
import CreateDonation from "./components/Donations/Users/CreateDonation";
import Contact from "./components/Contact";
import backgroundImage from './static/background.webp';
import Box from "@mui/material/Box";

function App() {
    // useEffect(() => {
    //     document.body.style.backgroundImage = `url('${backgroundImage}')`;
    //     document.body.style.backgroundSize = 'cover';
    //     document.body.style.backgroundPosition = 'center';
    //     document.body.style.backgroundRepeat = 'no-repeat';
    //     document.body.style.backgroundAttachment = 'fixed';
    //
    //     return () => {
    //         document.body.style.background = null;
    //     };
    // }, []);
    return (

        <BrowserRouter>
            <Header/>
            <div style={{backgroundImage: ''}}>

                <Container>
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
            </div>

            {/*<Footer/>*/}
        </BrowserRouter>
    );
}

export default App;
