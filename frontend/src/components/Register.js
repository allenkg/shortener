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

    loginHandler=()=> browserHistory.push('/login');

    registerHandler=()=>{
        this.props.actions.register();
    };


    render() {
        const {password, confirmPassword, email, name } = this.props;

        return (
            <div>
                <div><input type="text" name="name" value={name} placeholder="name" onChange={this.changeUserName}/></div>
                <div><input type="text" name="name" value={email} placeholder="email" onChange={this.changeUserEmail}/></div>
                <div><input type="password" name="name" value={password} placeholder="password" onChange={this.changeUserPassword}/></div>
                <div><input type="password" name="name" value={confirmPassword} placeholder="confirmPassword" onChange={this.changeConfUserPassword}/></div>
                <button onClick={this.registerHandler}> Register </button>
                <button onClick={this.loginHandler}> Log in </button>
            </div>
        )
    }
}

export default Register;