import React from 'react';
import PropTypes from 'prop-types';
import NotFound from "./NotFound";

class RedirectContainer extends React.Component {
  static propTypes = {
    linkObject: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      setTracker: PropTypes.func,
      setTrackerInitialState: PropTypes.func
    }.isRequired)
  };

  componentDidMount() {
    const linkProceedId = localStorage.getItem('link_id');
    this.props.actions.setTracker(linkProceedId);
  }

  componentWillUnmount() {
    this.props.actions.setTrackerInitialState();
  }

  render() {

    return (
      <div>
        <div className="content-center" id="loading"/>
      </div>
    );
  }
}

export default RedirectContainer;