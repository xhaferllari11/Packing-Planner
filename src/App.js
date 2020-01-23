import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import TripsPage from './pages/TripsPage/TripsPage';
import ClosetPage from './pages/ClosetPage/ClosetPage';
import signUpPage from './pages/SignUpPage/SignUpPage';
import signInPage from './pages/SignInPage/SignInPage';
import userService from './utils/userService';
import imageService from './utils/imageService';
import SignInPage from './pages/SignInPage/SignInPage';
import SignupPage from './pages/SignUpPage/SignUpPage';
import tripService from './utils/tripService';
import TripsDetail from './components/TripDetail/TripDetail';
import tripTokenService from './utils/tripTokenService';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      items: [],
      trips: []
    }
    console.log('userinstate', this.state.user);
  }

  componentDidMount() {
    this.getItems();
    console.log('hitosry', this.props)
  }
  async getItems() {
    if (this.state.user) {
      let itemsObj = await imageService.index();
      let tripsObj = await tripService.index();
      console.log('sl', itemsObj);
      console.log('tirpsobj', tripsObj);
      this.setState({
        items: itemsObj.images,
        trips: tripsObj
      });
    }
  };

  handleSignIn = () => {
    this.setState({ user: userService.getUser() }, this.getItems);
  }

  handleSignOut = () => {
    userService.signout();
    this.setState({
      user: null,
      items: [],
      trips: []
    });
    tripTokenService.removeToken();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.user} handleSignOut={this.handleSignOut} />
        {/* <h6> {this.state.user ? this.state.user._id : 'not signed in'}</h6> */}
        <div className="background-for-all">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exaxt path="/dashboard"
              render={({ history }) => (
                (this.state.user) ?
                  <DashboardPage
                    {...this.props}
                    history={history}
                    user={this.state.user}
                    items={this.state.items}
                  />
                  :
                  <Redirect to='/signin' />
              )
              }
            />
            {/* need to figure out how to put this trips page  and protect it*/}
            {this.state.trips.map((t, ind) =>
              <Route key={ind} exaxt path={`/trips/${t._id}`}
                render={({ history }) =>
                  <TripsDetail
                    {...this.props}
                    history={history}
                    user={this.state.user}
                    trip={t}

                  />} />
            )}
            <Route exaxt path="/trips"
              render={({ history }) => (
                (this.state.user) ?
                  <TripsPage
                    {...this.props}
                    history={history}
                    user={this.state.user}
                    trips={this.state.trips}
                  />
                  :
                  <Redirect to='/signin' />
              )
              } />

            <Route exact path="/closet"
              render={({ history }) => (
                (this.state.user) ?
                  <ClosetPage
                    {...this.props}
                    history={history}
                    user={this.state.user}
                    items={this.state.items}
                  />
                  :
                  <Redirect to='/signin' />
              )
              } />
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
          </Switch>
        </div>
        {/* <footer className='footer'>By Alban Xhaferllari 2020</footer> */}
      </div>
    );
  }
}

export default App;
