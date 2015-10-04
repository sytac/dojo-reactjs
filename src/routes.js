import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { IndexPage } from './pages';

export default class LocalRouter extends Component {
  render() {
    return (
        <Router>
          <Route path="/" component={IndexPage}></Route>
        </Router>
    );
  }
}