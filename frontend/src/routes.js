import React from 'react';
import App from "./containers/App";
import Layout from "./containers/Layout";
import MainPage from "./containers/MainPage.container";
import { IndexRoute, Route } from "react-router";
import Login from "./containers/Login.container";
import Register from "./containers/Register.container";
import RedirectContainer from "./containers/RedirectContainer.container";
import AdminRegister from "./containers/AdminRegister.container";
import AdminPage from "./containers/AdminPage.container";


export default (
  <Route component={App}>
    <Route path="/" component={Layout}>
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="admin-register" component={AdminRegister}/>
      <IndexRoute component={MainPage}/>
      <Route path="admin" component={AdminPage}/>
      <Route path="*" component={RedirectContainer}/>
    </Route>
  </Route>
)