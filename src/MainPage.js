import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import AuthPage from './Components/AuthPage';
import UserPage from './Components/UserPage';
import DonatePage from './Components/DonatePage';
import loginPage from './Components/LoginPage';

function Mainpage() {
    return (
        <Router>
            <Route path="/" exact component={App}/>
            {/* <Route path="/contact" exact component={ContactPage}/> */}
            <Route path="/donate" exact component={DonatePage}/>
            <Route path="/auth" exact component={AuthPage(UserPage)}/>
            <Route path="/login" exact component={loginPage}/>
        </Router>
    );
}

export default Mainpage;