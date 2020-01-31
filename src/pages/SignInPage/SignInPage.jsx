import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignInPage.css';
import userService from '../../utils/userService';

class SignInPage extends Component {

  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signin(this.state);
      await this.props.handleSignIn(); // assigns user to app state
      this.props.history.push('/dashboard');
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert('Invalid Credentials!');
    }
  }

  render() {
    return (
      <div className='login-page-holder'>
        <div className="LoginPage">
          <header className="header-footer-login">Sign In</header>
          <form className="form-horizontal" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <div className="col-sm-12">
                <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div className="singin-buttons-holder">
                <button className="btn btn-success" style={{ color: 'white', width: 90 }}>Sign In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/signup' style={{ textDecoration: 'none', fontSize: 16, color: 'white' }}
                className='btn-danger  btn'
              >Register</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignInPage;
