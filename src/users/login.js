import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

/**
 * Login
 */
export class Login extends Component {
  render() {
    return (
      <div>
        <h1> Login </h1>
        <Link to="/auth/google">Google Login</Link>
      </div>
    );
  }
}


export default Login;
