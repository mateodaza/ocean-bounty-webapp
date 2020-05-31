import React, { Component } from "react"
import Layout from './components/Layout'
import Home from './pages/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

export default class App extends Component {

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
  }
}

class Profile extends Component {
  render() {
    return <h2>Profile </h2>;
  }
}
