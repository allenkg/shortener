import React from 'react';
import { bindActionCreators } from "redux";
import MainPageActions from "../actions/main-page";
import { connect } from "react-redux";
import { browserHistory, Link } from "react-router";
import PropTypes from 'prop-types';
import LoginPageActions from "../actions/auth-page";


class TopNavPanel extends React.Component {
  static propTypes = {
    shortLink: PropTypes.string.isRequired,
    originalLink: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      changeOriginalLink: PropTypes.func,
      convertToShortLink: PropTypes.func,
      redirectTo: PropTypes.func,
      deleteLink: PropTypes.func,
    })
  };


  validateUrl = () => {
    if (this.props.originalLink.length > 3) {
      let res = this.props.originalLink.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      return res != null;
    }
  };

  shortLinkChangeHandler = (e) => {
    e.preventDefault();
    this.props.actions.shortLinkChange('');
  };

  inputChangeHandler = (e) => {
    e.preventDefault();
    const link = e.target.value;
    this.props.actions.changeOriginalLink(link);
  };

  convertToShort = () => {
    this.props.actions.convertToShortLink();
  };

  deleteLinkHandler = () => {
    this.props.actions.deleteLink(this.props.linkId)
  };

  copyLinkAddress = () => {
    document.getElementById('copy-link-id').select();
    window.document.execCommand('copy');
  };

  redirectToUrl = (currentLink) => {
    this.props.actions.redirectTo(currentLink);
    browserHistory.push(`${currentLink.short_link}`);
  };

  logoutClickHandler = () => {
    this.props.actions.logout();
    localStorage.clear();
    browserHistory.push('/login');
  };


  render() {
    const { shortLink, originalLink, authenticated, linkId } = this.props;
    const isActive = this.validateUrl() ? 'btn-main' : 'disabled';
    const serverPath = window.location.href;
    const shortUrl = `${serverPath}${shortLink}`;
    const isAdmin = localStorage.getItem('admin');

    return (
      <div className="top-container">
        {authenticated &&
        <div className="top-navigation-bar">
          <div className="home-link"> <Link to="/"> Home </Link> </div>
          <div className="content-center">

            {this.props.shortLink.length === 0 ?
              <div className="original-link-input m-t">
                <input type="text" className="link-input" value={originalLink} placeholder="Past URL here"
                       onChange={this.inputChangeHandler}/>
                <button className={`${isActive}`} onClick={this.convertToShort.bind(null, isActive)}> SHORTEN</button>
              </div> :
              <div className="original-link-input m-t">
                <input id="copy-link-id" type="text" className="link-input" value={shortUrl} placeholder="Past URL here"
                       onChange={this.shortLinkChangeHandler}/>
                <span className="delete-short-link" onClick={this.deleteLinkHandler.bind(this)}>X</span>
                <button className="btn-main copy-btn" onClick={this.copyLinkAddress}> COPY
                </button>
                <div id="origin-link">
                  <a href="#" onClick={this.redirectToUrl.bind(null, originalLink)}>{originalLink} shortening</a>
                </div>
              </div>
            }
          </div>
          <div className="top-menu-right-nav-bar">
            <div> {isAdmin === 'true' && <Link to="/admin/"> Admin panel</Link>} </div>
            <div className="logout" onClick={this.logoutClickHandler}><a href="#">Log out</a></div>
          </div>
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.mainPage,
    authenticated: state.authPage.authenticated
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

export default connect(mapStateToProps, mapDispatchToProps)(TopNavPanel)