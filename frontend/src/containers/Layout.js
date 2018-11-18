import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import MainPageActions from '../actions/main-page';
import React from 'react';


class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.mainPage
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MainPageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)