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
    if (this.props.linkObject.orig_link) {
      this.props.actions.setTracker(this.props.linkObject.id);
    }
  }

  componentWillUnmount() {
    this.props.actions.setTrackerInitialState();
  }

  render() {

    return (
      <div>
        {
          !!this.props.linkObject.orig_link ?
            <div className="content-center" id="loading"/> :
            <NotFound/>
        }
      </div>
    );
  }
}

export default RedirectContainer;