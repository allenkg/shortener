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
          <table className="table">
            <th>User</th>
            <th>Shorter</th>
            <th>Country</th>
            <th>Time</th>
            {this.props.trackers && this.props.trackers.map((tracker) =>
              <tr>
                <td>{tracker.user_id}</td>
                <td>{tracker.link_id}</td>
                <td>{tracker.location}</td>
                <td>{tracker.created_at}</td>
              </tr>
            )}
          </table>
        </div>
      </div>
    );
  }
}

export default AdminPage;