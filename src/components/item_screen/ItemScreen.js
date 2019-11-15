import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { changeItemHandler } from '../../store/database/asynchHandler';
class ItemScreen extends Component{
    state = {
        description: this.props.todoList == null ? "" : this.props.item.description,
        due_date: this.props.todoList == null ? "" : this.props.item.due_date,
        assigned_to: this.props.todoList == null ? "" : this.props.item.assigned_to,
        completed: this.props.todoList == null ? false : this.props.item.completed,
        id: this.props.item.id,
        key: this.props.item.key,
        done: false
    }
    handleChange = (e) => {
        const { target } = e;
        if(target.id == "completed"){
            this.setState(state => ({
                ...state,
                [target.id]: target.checked,
            }))
        }
        else{
        this.setState(state => ({
        ...state,
        [target.id]: target.value,
    }))}}
    handleSubmit = (e) =>{
        const{props, state} = this;
        const{firebase} = props;
        const newItem = {...state};
        const{id} = this.props;
        this.props.items[id] = newItem;
        props.changeItem(this.props.todoList.id, firebase, this.props.items, this.props.todoList);
        this.setState({
            done: true,
        }
        );
    }
    render(){
        const item = this.props.item;
        if (!this.props.auth.uid) {
            return <Redirect to="/" />;
        }
        else if(this.state.done){
            return <Redirect to={'/todoList/' + this.props.todoList.id} />
        }
        return (
        <div id="item_screen">
            <div className="container white">
                <h5 className="grey-text text-darken-3">Item</h5>
                <div className="input-field">
                    <label htmlFor="email" className="active">Description</label>
                    <input class="active" type="text" name="description" id="description" value={this.state.description} onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Assigned To</label>
                    <input className="active" type="text" name="assigned_to" id="assigned_to" value={this.state.assigned_to} onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Due Date</label>
                    <input className="active" type="date" name="due_date" id="due_date" value={this.state.due_date} onChange={this.handleChange}/>
                </div>
                <div>
                    <label>
                        <input id="completed" type="checkbox" checked={this.state.completed} onChange={this.handleChange}/>
                        <span>Completed</span>
                    </label>
                </div>
                <div className="input-field">
                <button type="submit" className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const {items} = ownProps.location.state;
    const {todoList} = ownProps.location.state;
    const {id} = ownProps.match.params;
    const item = items[id];
    return{
        todoList, item, id, items,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = dispatch => ({
    changeItem: (id, firebase, items, todoList) => dispatch(changeItemHandler(id, firebase, items, todoList)),
  });
export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
)(ItemScreen);