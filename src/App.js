import React from 'react';
import {  Route } from "react-router-dom";
import './App.css';

import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ClosetPage from './pages/ClosetPage/ClosetPage';
import signUpPage from './pages/SignUpPage/SignUpPage';
import signInPage from './pages/SignInPage/SignInPage';
import userService from './utils/userService';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: userService.getUser()
    }
    console.log(this.state.user);
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className='container'>
          <Route exact path="/" component={HomePage} />
          <Route exaxt path="/dashboard" component={DashboardPage} />
          <Route exact path="/closet" component={ClosetPage} />
          <Route exact path="/signin" component={signInPage} />
          <Route exact path="/signup" component={signUpPage} />
        </div>
      </div>
    );
  }
}

export default App;
