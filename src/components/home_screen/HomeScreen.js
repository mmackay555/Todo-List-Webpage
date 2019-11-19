import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { orderListHandler, changeOwnerHandler } from '../../store/database/asynchHandler';

class HomeScreen extends Component {
    orderLists = () =>{
        const {firebase} = this.props;
        this.props.orderList(firebase);
    }
    handleNewList = (e) =>{

    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        this.orderLists();
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks todoLists = {this.props.todoLists}/>
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br/>
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <NavLink to="/new_list" className="btn teal lighten-1 z-depth-0" type="button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.todoLists,
        auth: state.firebase.auth
    };
};
const mapDispatchToProps = dispatch => ({
    orderList: (firebase) => dispatch(orderListHandler(firebase))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['timestamp', 'desc']},
    ]),
    firebaseConnect()
)(HomeScreen);