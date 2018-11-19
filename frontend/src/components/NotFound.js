import React from 'react';
import {Link} from 'react-router';

class NotFound extends React.Component {

  render() {
    return (
      <div className="middle-box text-center animated fadeInDown">
        <h1>404</h1>
        <h3 className="font-bold">Not Found</h3>
        <div className="error-desc">
          Please wait...
          <br/>
          <Link to='/'>
            <button className="m-t-md btn btn-success">on main page</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
