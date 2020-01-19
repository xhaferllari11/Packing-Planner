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
import imageService from './utils/imageService';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: userService.getUser(),
    }
    console.log('userinstate',this.state.user);
    this.fk()
  }

  async fk(){
    let a = await imageService.index();
    console.log('sl',a);
  }

  render() {
    return (
      <div className="App">
        <NavBar />
  <h6>as{this.state.user._id}</h6>
        < >
          <Route exact path="/" component={HomePage} />
          <Route exaxt path="/dashboard"
            render={({history})=>
              <DashboardPage
                history={history}
                user={this.state.user}
                />} 
          />
          <Route exact path="/closet" component={ClosetPage} />
          <Route exact path="/signin" component={signInPage} />
          <Route exact path="/signup" component={signUpPage} />
        </>
      </div>
    );
  }
}

export default App;
