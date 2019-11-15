import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { changeNameHandler } from '../../store/database/asynchHandler.js';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;
        const {firebase} = this.props;
        const todoList = this.props.todoList;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        if(target.id == "name"){
            todoList.name = target.value;
            this.props.changeName(todoList.id, firebase, todoList);
        }
        else if(target.id == "owner"){
            todoList.owner = target.value;
            this.props.changeOwner(todoList.id, firebase, todoList);
        }
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
    changeName: (id, firebase, todoList) => dispatch(changeNameHandler(id, firebase, todoList)),
    changeOwner: (id, firebase, todoList) => dispatch(changeNameHandler(id, firebase, todoList))
  });

export default compose(
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(ListScreen);