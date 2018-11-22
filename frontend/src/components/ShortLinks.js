import React from 'react';
import PropTypes from 'prop-types';

class ShortLinks extends React.Component {
  static propTypes = {
    links: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    redirectToUrl: PropTypes.func.isRequired,
  };

  redirectTo = (link) => {
    this.props.redirectToUrl(link)
  };

  render() {
    const { links, isLoading } = this.props;
    const serverPath = window.location.href;

    if (isLoading)
      return (<div id="loading"/>);

    return (
      <div className="main-block">
        {links.map((link, index) =>
          <div className="url-item-block" key={index}>
            <div>
              <a href="#" onClick={this.redirectTo.bind(null, link)}>{`${serverPath}${link.short_link}`}</a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ShortLinks;