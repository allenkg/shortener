import React from 'react';
import App from "./containers/App";
import Layout from "./containers/Layout";
import MainPage from "./containers/MainPage.container";
import { IndexRoute, Route } from "react-router";
import Login from "./containers/Login.container";
import Register from "./containers/Register.container";


export default (
  <Route component={App}>
    <Route path="/" component={Layout}>
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <IndexRoute component={MainPage}/>
    </Route>
  </Route>
)