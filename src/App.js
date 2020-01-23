import React from 'react';
import { Route, Switch } from "react-router-dom";
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
    let itemsObj = await imageService.index();
    let tripsObj = await tripService.index();
    console.log('sl', itemsObj);
    console.log('tirpsobj', tripsObj);
    this.setState({
      items: itemsObj.images,
      trips: tripsObj
    });
  };

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
        {/* <h6> {this.state.user ? this.state.user._id : 'not signed in'}</h6> */}
        < >
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exaxt path="/dashboard"
            render={({ history }) =>
              <DashboardPage
                {...this.props}
                history={history}
                user={this.state.user}
                items={this.state.items}
              />}
          />
          {/* need to figure out how to put this trips page */}
          {this.state.trips.map((t, ind) =>
            <Route key={ind} exaxt path={`/trips/${t._id}`}
              render={({history}) =>
                <TripsDetail
                  {...this.props}
                  history={history}
                  user={this.state.user}
                  trip={t}

                />} />
          )}
          <Route exaxt path="/trips"
            render={({ history }) =>
              <TripsPage
                {...this.props}
                history={history}
                user={this.state.user}
                trips={this.state.trips}
              />} />
          <Route exact path="/closet"
            render={({ history }) =>
              <ClosetPage
                {...this.props}
                history={history}
                user={this.state.user}
                items={this.state.items}
              />} />
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
        </>
        <footer className='footer'>By Alban Xhaferllari 2020</footer>
      </div>
    );
  }
}

export default App;
