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
    console.log(this.props.trackers);

    return (
      <div>
        ADMIN panel
      </div>
    );
  }
}

export default AdminPage;