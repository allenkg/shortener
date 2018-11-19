import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from "react-router";

class Login extends React.Component {
  static PropTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      changeEmail: PropTypes.func.isRequired,
      changePassword: PropTypes.func.isRequired,
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    })
  };

  changeUserEmail = (e) => {
    e.preventDefault();
    const email = e.target.value;
    this.props.actions.changeEmail(email);
  };

  changeUserPassword = (e) => {
    e.preventDefault();
    const password = e.target.value;
    this.props.actions.changePassword(password);
  };

  loginHandler = (e) => {
    e.preventDefault();
    this.props.actions.login()
  };

  registerHandler = () => {
    browserHistory.push('/register')
  };


  render() {
    const {password, email} = this.props;

    return (

      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form" role="form" onSubmit={this.loginHandler}>
              <span className="login100-form-title p-b-26"> Welcome </span>
              <span className="login100-form-title p-b-48">
						      <i className="zmdi zmdi-font"/>
					      </span>

              <div className="wrap-input100 validate-input">
                <input className="input100" type="email" name="name" value={email} onChange={this.changeUserEmail}/>
                {email.length === 0 && <span className="focus-input100" data-placeholder="Email"/>}
              </div>

              <div className="wrap-input100 validate-input" data-validate="Enter password">
                <span className="btn-show-pass"><i className="zmdi zmdi-eye"/></span>
                <input className="input100" type="password" value={password} onChange={this.changeUserPassword}/>
                <span className="focus-input100" data-placeholder={!!password ? "" : "Password"}/>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"/>
                  <button className="login100-form-btn" type="submit">
                    Login
                  </button>
                </div>
              </div>

              <div className="text-center p-t-115">
						      <span className="txt1">
                    Don’t have an account?
                  </span>
                <a className="txt2" href="#" onClick={this.registerHandler}>
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

    )
  }
}

export default Login;