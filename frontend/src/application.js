import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";
import configureStore from "./store";
import Root from "./containers/Root";
// import Api from "./api/api";

export default class Application {
  static createApplication() {
    return new Application();
  }

  init() {
    // this._createApi();
    this._createStore();
    this._createHistory();
    // this.enableHotReload();
  }

  start() {
    this._renderMain();
  }

  // _createApi() {
  //   this.api = new Api();
  // }

  _createStore() {
    this.store = configureStore(this.api);
  }

  _createHistory() {
    this.history = syncHistoryWithStore(browserHistory, this.store)
  }

  _renderMain() {
    ReactDOM.render((
      <Root store={this.store} history={this.history}/>
    ), document.getElementById('root'))
  }

  // renderComponent(Component) {
  //   ReactDOM.render((
  //     <AppContainer>
  //       <Component store={this.store} history={this.history}/>
  //     </AppContainer>
  //   ), document.getElementById('root'))
  // }

  // enableHotReload() {
  //   if (module.hot) {
  //     module.hot.accept('./containers/Root', () => {
  //       this.renderComponent(Root);
  //     });
  //   }
  // }
}