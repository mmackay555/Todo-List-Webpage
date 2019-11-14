import React, { Component } from 'react';
import { newListHandler } from '../../store/database/asynchHandler';
import { compose } from '../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class NewListScreen extends Component{
    state = {
        name: "",
        owner: "",
        items: [],
        completed: false,
    }
    handleChange = (e) => {
        const { target } = e;
        this.setState(state => ({
        ...state,
        [target.id]: target.value,
    }))}
    handleSubmit = (e) => {
        const{props, state} = this;
        const{firebase} = props;
        const todoList = {...state};
        props.newList(todoList, firebase);
        this.setState({
            completed: true
        });
    }
    render() {
        if (this.state.completed) {
          return <Redirect to="/" />;
        } 
    return (
    <div id="new_list_item">
                <h3 id="new_list_heading">New List</h3>
                <div id="new_list_form_container">
                    <div id="name_prompt" className="item_prompt">Name:</div>
                    <input id="name" className="item_input" type="input" onChange= {this.handleChange}/>
                    <div id="user_prompt" className="item_prompt">Owner:</div>
                    <input id="owner" className="item_input" type="input" onChange= {this.handleChange}/>
                </div>
                <div className="input-field">
                <button type="submit" className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
            
    );
}
}
const mapStateToProps = state => ({
    auth: state.firebase.auth,
    authError: state.auth.authError,
  });
  const mapDispatchToProps = dispatch => ({
    newList: (todoList, firebase) => dispatch(newListHandler(todoList, firebase)),
  });

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
)(NewListScreen);