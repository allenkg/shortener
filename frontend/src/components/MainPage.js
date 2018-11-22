import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from "react-router";
import ShortLinks from "./ShortLinks";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortURL: '',
      links: props.userURLs,
      showAdminReport: false
    }
  }

  static PropTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    userURLs: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      fetchUrls: PropTypes.func.isRequired,
    })
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    localStorage.removeItem('link_id');
    if (!this.props.authenticated && !token)
      browserHistory.push('/login');
    else
      this.props.actions.fetchUrls();
  }

  myLinksClickHandler = () => {
    this.setState({ links: this.props.userURLs, showAdminReport: false })
  };

  allLinksClickHandler = () => {
    this.setState({ links: this.props.data, showAdminReport: false })
  };

  redirectToUrl = (currentLink) => {
    this.props.actions.redirectTo(currentLink);
    browserHistory.push(`${currentLink.short_link}`);
  };

  reportClickHandler=()=>{
    browserHistory.push('/admin/')
  };

  render() {
    const { isLoading, userURLs } = this.props;
    const isAdmin = localStorage.getItem('admin');
    const links = this.state.links.length > 0 ? this.state.links : userURLs;

    return (
      <div>
        <div className="main-container">
          <div className="content-block">
            <div className="left-block">
              <ul className="navigation-panel">
                {isAdmin === 'true' &&
                <li onClick={this.reportClickHandler} className="navigation-panel-item"> Show report </li>}
                <li onClick={this.myLinksClickHandler} className="navigation-panel-item"> My shorten URLs</li>
                <li onClick={this.allLinksClickHandler} className="navigation-panel-item"> All shorten URLs</li>
              </ul>
            </div>
            { isAdmin === 'true' && this.state.showAdminReport ?
              <div className="main-block">
                SHOW REPORT !!!!
              </div>:
              <ShortLinks isLoading={isLoading} links={links} redirectToUrl={this.redirectToUrl}/>}
          </div>
        </div>
      </div>
    )
  }
}

export default MainPage;