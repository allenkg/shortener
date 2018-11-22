import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import MainPageActions from '../actions/main-page';
import React, { Fragment } from 'react';
import TopNavPanel from "./TopNavPanel.container";
import LoginPageActions from "../actions/auth-page";


class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token && !this.props.authenticated) {
      this.props.actions.alreadyLogIn();
    }
  }

  render() {
    return (
      <Fragment>
        <TopNavPanel/>
        <div>
          {this.props.children}
        </div>
        <div className="footer">
          <span>Coding Test Task</span>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.mainPage,
    ...state.authPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...MainPageActions,
      ...LoginPageActions,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)