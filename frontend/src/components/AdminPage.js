import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class AdminPage extends React.Component {
  static propTypes = {
    trackers: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      fetchRecords: PropTypes.func,
      changeSearch: PropTypes.func,
      changePageNumber: PropTypes.func,
      changeOffset: PropTypes.func,
      refreshReportData: PropTypes.func
    })
  };

  componentDidMount() {
    this.props.actions.fetchRecords();
  }

  changeInputSearch = (e) => {
    const query = e.target.value;
    this.props.actions.changeSearch(query);
  };

  changeOffsetHandler = (e) => {
    const number = e.target.value;
    this.props.actions.changeOffset(number);
  };

  refreshHandler = () => {
    this.props.actions.refreshReportData();
    this.props.actions.fetchRecords();
  };

  changePageNumberHandler = (e) => {
    const number = e.target.value;

    const hashNumbers = {
      '1': '0',
      '2': '5',
      '3': '10',
      '4': '15'
    };
    console.log(hashNumbers[number]);
    this.props.actions.changePageNumber(number);
    this.props.actions.changeOffset(hashNumbers[number]);
    this.props.actions.fetchRecords();
  };

  render() {
    const location = window.location.href;
    if (this.props.trackersLoading) {
      return (<div id="loading"/>)
    }

    return (
      <div className="main-container">

        <div className="content-block">
          <table className="table">
            <th>User</th>
            <th>Shorter</th>
            <th>Country</th>
            <th>Time</th>
            {this.props.trackers.map((tracker) =>
              <tr>
                <td>{tracker.user_email}</td>
                <td>{`${location}${tracker.short_link}`}</td>
                <td>{tracker.location}</td>
                <td>{tracker.created_at}</td>
              </tr>
            )}
          </table>

          <div className="admin-report-nav-bar">
            <div className="search-box">
              <input type="text" onChange={this.changeInputSearch}/> <span
              onClick={this.props.actions.fetchRecords}>V</span>
            </div>
            <div className="page-number">
              <select name="name" onChange={this.changePageNumberHandler} value={this.props.pageNumber}>
                {_.range(1, this.props.totalPages).map(value => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
            <div className="offset">
              <select name="offset" id="offset" onChange={this.changeOffsetHandler}>
                <option value="5" selected={this.props.perPage === 5}>5</option>
                <option value="10" selected={this.props.perPage === 10}>10</option>
                <option value="20" selected={this.props.perPage === 20}>20</option>
              </select>
            </div>
            <div className="refresh">
              <button onClick={this.refreshHandler}> Refresh</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;