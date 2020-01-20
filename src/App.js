import React from 'react';
import { Route } from "react-router-dom";
import './App.css';

import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ClosetPage from './pages/ClosetPage/ClosetPage';
import signUpPage from './pages/SignUpPage/SignUpPage';
import signInPage from './pages/SignInPage/SignInPage';
import userService from './utils/userService';
import imageService from './utils/imageService';
import SignInPage from './pages/SignInPage/SignInPage';
import SignupPage from './pages/SignUpPage/SignUpPage';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
    }
    console.log('userinstate', this.state.user);
    // this.fk()
  }

  componentDidMount() {
    console.log('hitosry', this.props)
  }
  // async fk(){
  //   let a = await imageService.index();
  //   console.log('sl',a);
  // }

  handleSignIn = () => {
    this.setState({ user: userService.getUser() });
  }

  handleSignOut = () => {
    userService.signout();
    this.setState({ user: null })
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="App">
        <NavBar handleSignOut={this.handleSignOut} />
        <h6> {this.state.user ? this.state.user._id : 'not signed in'}</h6>
        < >
          <Route exact path="/" component={HomePage} />
          <Route exaxt path="/dashboard"
            render={({ history }) =>
              <DashboardPage
                history={history}
                user={this.state.user}
              />}
          />
          <Route exact path="/closet" component={ClosetPage} />
          <Route exact path="/signin" render={({ history }) =>
            <SignInPage
              history={history}
              handleSignIn={this.handleSignIn}
            />} />
          <Route exact path="/signup" render={({ history }) =>
            <SignupPage
              history={history}
              handleSignIn={this.handleSignIn}
            />} />
        </>
      </div>
    );
  }
}

export default App;
