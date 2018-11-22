import React from 'react';
import PropTypes from 'prop-types';

class AdminPage extends React.Component {
  static propTypes = {
    trackers: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      fetchRecords: PropTypes.func
    })
  };

  componentDidMount() {
    this.props.actions.fetchRecords();
  }

  render() {

    return (
      <div className="main-container">
        <div className="content-block">
          REPORT
        </div>
      </div>
    );
  }
}

export default AdminPage;