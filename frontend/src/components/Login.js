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

    loginHandler=()=> this.props.actions.login();

    registerHandler=()=>{
      browserHistory.push('/register')
    };


    render() {
        const {password, email } = this.props;

        return (
            <div>
                <input type="email" name="name" value={email} onChange={this.changeUserEmail}/>
                <input type="password" name="name" value={password} onChange={this.changeUserPassword}/>
                <button onClick={this.loginHandler}> Log in</button>
                <button onClick={this.registerHandler}> Register </button>
            </div>
        )
    }
}

export default Login;