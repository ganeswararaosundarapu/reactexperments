import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppRouting from './routes';
import rootReducer from './root_reducer';


class App extends Component {
  render() {
    let store = createStore(rootReducer, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <AppRouting />
      </Provider>
    );
  }
}

export default App;
