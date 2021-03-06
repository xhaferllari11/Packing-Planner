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
  }
  
  componentDidMount() {
    this.getItems();
  }
  
  async getItems() {
    if (this.state.user) {
      let itemsObj = await imageService.index();
      let tripsObj = await tripService.index();
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
  
  addTrip = (t) => {
    if (t) {
      this.setState((state) => {
        let trips = state.trips
        trips.push(t);
        return { trips: trips };
      });
    };
  };
  
  addItem = (i) => {
    if (i) {
      this.setState((state) => {
        let items = state.items;
        items.push(i);
        return { items: items };
      })
    }
  }
  
  
  render() {
    const backgroundStyle = {
      backgroundImage: 
      (this.props.history.location.pathname === '/signup' ||
      this.props.history.location.pathname === '/signin' ||
      this.props.history.location.pathname === '/') ?
      "url(./homeBackground.png)" : ''  //this reads image from public folder. When images read from dynamic data, browser looks is public folder. When read from css file, it is read before transpiled and looks in images folder
    }
    return (
      <div className="App">
        <NavBar user={this.state.user} handleSignOut={this.handleSignOut} />
        <div style={backgroundStyle} className="background-for-all">
          <Switch>
            <Route exact path="/"
              render={({ history }) => (
                <HomePage
                  user={this.state.user}
                  handleSignIn={this.handleSignIn}
                  history={history}  
                />
              )} />
            <Route exaxt path="/dashboard"
              render={({ history }) => (
                (this.state.user) ?
                  <DashboardPage
                    {...this.props}
                    history={history}
                    user={this.state.user}
                    items={this.state.items}
                    addTrip={this.addTrip} />
                  :
                  <Redirect to='/signin' />
              )}
            />
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
            <Route exact path="/trips"
              render={({ history }) => (
                (this.state.user) ?
                  <TripsPage
                    {...this.props}
                    history={history}
                    user={this.state.user}
                    trips={this.state.trips} />
                  :
                  <Redirect to='/signin' />
              )} />
            <Route exact path="/closet"
              render={({ history }) => (
                (this.state.user) ?
                  <ClosetPage
                    {...this.props}
                    history={history}
                    user={this.state.user}
                    items={this.state.items}
                    addItem={this.addItem} />
                  :
                  <Redirect to='/signin' />)} />
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
      </div>);
  }
}

export default App;
