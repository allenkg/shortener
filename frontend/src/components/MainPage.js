import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from "react-router";

class MainPage extends React.Component {
  static PropTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      fetchUrls: PropTypes.func.isRequired,

      changeOriginalLink: PropTypes.func,
      convertToShortLink: PropTypes.func,
      redirectTo: PropTypes.func,
      deleteLink: PropTypes.func,
    })
  };

  state = {
    shortURL: ''
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!this.props.authenticated && !token)
      browserHistory.push('/login');
    else
      this.props.actions.fetchUrls();
  }

  inputChangeHandler = (e) => {
    e.preventDefault();
    const link = e.target.value;
    this.props.actions.changeOriginalLink(link);
  };

  shortLinkChangeHandler = (e) => {
    e.preventDefault();
    this.props.actions.shortLinkChange('');
  };

  convertToShort = () => {
    this.props.actions.convertToShortLink();
  };

  redirectToUrl = (currentLink) => {
    this.props.actions.redirectTo(currentLink);
    browserHistory.push(`${currentLink.short_link}`);
  };

  deleteLinkHandler = () => {
    this.props.actions.deleteLink(this.props.linkId)
  };

  copyLinkAddress = (link) => {
    this.props.actions.redirectTo(link)
  };

  validateUrl = () => {
    if (this.props.originalLink.length > 3) {
      let res = this.props.originalLink.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      if (res == null)
        return false;
      else
        return true;
    }
  };

  render() {
    const {data, shortLink, originalLink} = this.props;
    const isActive = this.validateUrl() ? 'btn-main' : 'disabled';
    const shortUrl = `shorten.com/${shortLink}`;

    return (
      <div className="main-container">
        <div className="top-container">
          <div className="content-center">
            {this.props.shortLink.length === 0 ?
              <div className="original-link-input m-t-4">
                <input type="text" className="link-input" value={originalLink} placeholder="Past URL here"
                       onChange={this.inputChangeHandler}/>
                <button className={`${isActive}`} onClick={this.convertToShort.bind(null, isActive)}> SHORTEN</button>
              </div> :
              <div className="original-link-input m-t-4">
                <input type="text" className="link-input" value={shortUrl} placeholder="Past URL here"
                       onChange={this.shortLinkChangeHandler}/>
                <span className="delete-short-link" onClick={this.deleteLinkHandler.bind(this)}>X</span>
                <button className="btn-main copy-btn" onClick={this.copyLinkAddress.bind(null, shortLink)}> COPY</button>
                <div>
                  <a href="#" onClick={this.redirectToUrl.bind(null, originalLink)}>{originalLink} shortening</a>
                </div>
              </div>

            }
          </div>
        </div>

        {data && data.length> 0 ?
          <div className="left-container">
          <div className="short-url-list-container">
            {data.map((item, index) =>
              <div className="url-item-block" key={index}>
                <div>
                  <a href="#" onClick={this.redirectToUrl.bind(null, item)}>{`shorten.com/${item.short_link}`}</a>
                </div>
              </div>
            )}
          </div>

        </div> :
          <p>Add url </p>
        }
      </div>
    )
  }
}

export default MainPage;