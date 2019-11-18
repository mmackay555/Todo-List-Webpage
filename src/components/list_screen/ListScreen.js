import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { changeNameHandler, deleteListHandler } from '../../store/database/asynchHandler.js';
import { Modal, Button, Icon } from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        deleted: false
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
    deleteList = () => {
        const {firebase} = this.props;
        this.props.deleteList(this.props.todoList.id, firebase);
        this.setState({
            deleted: true,
        });
    }
    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid || this.state.deleted) {
            return <Redirect to="/" />;
        }
        return ( 
            <div className="container white">
                <div class="row">
                <div className="col s11">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                </div>
                <div class="col s1">
        <Modal header="Delete List?" trigger={<Button icon={<Icon>delete</Icon>}/>} actions={[<Button modal="close">Cancel</Button>, <Button modal="close" onClick={this.deleteList}>Submit</Button>]}>
                        <b>Are you sure you want to delete this list?</b>
                        <br></br>
                        <p>The list will not be retrievable.</p>
                    </Modal>
                </div>
                </div>
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
    changeOwner: (id, firebase, todoList) => dispatch(changeNameHandler(id, firebase, todoList)),
    deleteList: (id, firebase) => dispatch(deleteListHandler(id, firebase))
  });

export default compose(
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(ListScreen);