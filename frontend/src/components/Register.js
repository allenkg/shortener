import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from "react-router";

class Register extends React.Component {
  static PropTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      changeName: PropTypes.func.isRequired,
      changeEmail: PropTypes.func.isRequired,
      changePassword: PropTypes.func.isRequired,
      changePassConf: PropTypes.func.isRequired,
      register: PropTypes.func.isRequired,
    })
  };

  changeUserEmail = (e) => {
    e.preventDefault();
    const email = e.target.value;
    this.props.actions.changeEmail(email);
  };

  changeUserName = (e) => {
    e.preventDefault();
    const name = e.target.value;
    this.props.actions.changeName(name);
  };

  changeUserPassword = (e) => {
    e.preventDefault();
    const password = e.target.value;
    this.props.actions.changePassword(password);
  };

  changeConfUserPassword = (e) => {
    e.preventDefault();
    const confPass = e.target.value;
    this.props.actions.changePassConf(confPass);
  };

  loginHandler = () => browserHistory.push('/login');

  registerHandler = (e) => {
    e.preventDefault();
    this.props.actions.register();
  };


  render() {
    const {password, confirmPassword, email, name} = this.props;

    return (
      <div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <form className="login100-form validate-form" role="form" onSubmit={this.registerHandler}>
                <span className="login100-form-title p-b-26"> Register </span>
                <span className="login100-form-title p-b-48">
						      <i className="zmdi zmdi-font"/>
					      </span>

                <div className="wrap-input100 validate-input">
                  <input className="input100" type="text" value={name} onChange={this.changeUserName}/>
                  {name.length === 0 && <span className="focus-input100" data-placeholder="User Name"/>}
                </div>

                <div className="wrap-input100 validate-input">
                  <input className="input100" type="email" value={email} onChange={this.changeUserEmail}/>
                  {email.length === 0 && <span className="focus-input100" data-placeholder="Email"/>}
                </div>

                <div className="wrap-input100 validate-input">
                  <span className="btn-show-pass"><i className="zmdi zmdi-eye"/></span>
                  <input className="input100" type="password" value={password} onChange={this.changeUserPassword}/>
                  <span className="focus-input100" data-placeholder={!!password ? "" : "Password"}/>
                </div>

                <div className="wrap-input100 validate-input">
                  <span className="btn-show-pass"><i className="zmdi zmdi-eye"/></span>
                  <input className="input100" type="password" value={confirmPassword}
                         onChange={this.changeConfUserPassword}/>
                  <span className="focus-input100" data-placeholder={!!confirmPassword ? "" : "Confirm Password"}/>
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"/>
                    <button className="login100-form-btn" type="submit">
                      Register
                    </button>
                  </div>
                </div>

                <div className="text-center p-t-115">
						      <span className="txt1">
                    Already have an account?
                  </span>
                  <a className="txt2" href="#" onClick={this.loginHandler}>
                    Log in
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Register;