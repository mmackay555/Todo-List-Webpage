import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import Navbar from './components/navbar/Navbar.js';
import RegisterScreen from './components/register_screen/RegisterScreen.js';
import LoginScreen from './components/login_screen/LoginScreen.js';
import HomeScreen from './components/home_screen/HomeScreen.js';
import ListScreen from './components/list_screen/ListScreen.js';
import DatabaseTester from './test/DatabaseTester';
import NewListScreen from './components/new_list_screen/NewListScreen.js';
import ItemScreen from './components/item_screen/ItemScreen.js';
import NewItemScreen from './components/item_screen/NewItemScreen.js';

class App extends Component {
  orderTimestamp(){
    const {firebase} = this.props;
    
  }
  render() {
    const { auth } = this.props;
    
    // if auth is loaded then we render App.
    // But if not then we doesn't render the one.
    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomeScreen}/>
              <Route path="/databaseTester" component={DatabaseTester}/>
              <Route path="/register" component={RegisterScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/todoList/:id/new_item" component={NewItemScreen} />
              <Route path="/todoList/:id/item/:id" component={ItemScreen} />
              <Route path="/todoList/:id" component={ListScreen} />
              <Route path="/new_list" component={NewListScreen} />
              <Route path="/:any" component={HomeScreen} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);