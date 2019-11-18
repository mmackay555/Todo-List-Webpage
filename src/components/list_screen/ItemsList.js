import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { changeNameHandler } from '../../store/database/asynchHandler';
import {Button, Icon} from 'react-materialize'

class ItemsList extends React.Component {
    state = {
        dueDateSorted: false,
        nameSorted: false, 
        completedSorted: false
    }
    compareNameIncreasing = (item1, item2) =>{
        if(item1.description > item2.description){
            return 1;
        }
        else if(item1.description < item2.description){
            return -1;
        }
        else{
            return 0;
        }
    }
    compareNameDecreasing = (item1, item2) =>{
        if(item1.description < item2.description){
            return 1;
        }
        else if(item1.description > item2.description){
            return -1;
        }
        else{
            return 0;
        }
    }
    sortByName = () => {
        let listItems = this.props.todoList.items;
        const {firebase} = this.props;
        if(!(this.state.nameSorted)){
            this.props.todoList.items.sort(this.compareNameIncreasing);
            let i = 0;
            for(i = 0; i < listItems.length; i++){
                listItems[i].key = i;
                listItems[i].id = i;
            }
            this.setState({nameSorted: true});
            this.props.changeName(this.props.todoList.id, firebase, this.props.todoList);
            this.forceUpdate();
        }
        else{
            this.props.todoList.items.sort(this.compareNameDecreasing);
            let i = 0;
            for(i = 0; i < listItems.length; i++){
                listItems[i].key = i;
                listItems[i].id = i;
            }
            this.setState({nameSorted: false});
            this.props.changeName(this.props.todoList.id, firebase, this.props.todoList);
            this.forceUpdate();
        }
    }
    compareDueDateIncreasing = (item1, item2) =>{
        if(item1.due_date > item2.due_date){
            return 1;
        }
        else if(item1.due_date < item2.due_date){
            return -1;
        }
        else{
            return 0;
        }
    }
    compareDueDateDecreasing = (item1, item2) => {
        if(item1.due_date < item2.due_date){
            return 1;
        }
        else if(item1.due_date > item2.due_date){
            return -1;
        }
        else{
            return 0;
        }
    }
    sortByDueDate = () => {
        let listItems = this.props.todoList.items;
        const {firebase} = this.props;
        if(!(this.state.dueDateSorted)){
            this.props.todoList.items.sort(this.compareDueDateIncreasing);
            let i = 0;
            for(i = 0; i < listItems.length; i++){
                listItems[i].key = i;
                listItems[i].id = i;
            }
            this.setState({dueDateSorted: true});
            this.props.changeName(this.props.todoList.id, firebase, this.props.todoList);
            this.forceUpdate();
        }
        else{
            this.props.todoList.items.sort(this.compareDueDateDecreasing);
            let i = 0;
            for(i = 0; i < listItems.length; i++){
                listItems[i].key = i;
                listItems[i].id = i;
            }
            this.setState({dueDateSorted: false});
            this.props.changeName(this.props.todoList.id, firebase, this.props.todoList);
            this.forceUpdate();
        }
    }
    compareCompletedIncreasing = (item1, item2) =>{
        if(item1.completed > item2.completed){
            return 1;
        }
        else if(item1.completed < item2.completed){
            return -1;
        }
        else{
            return 0;
        }
    }
    compareCompletedDecreasing = (item1, item2) =>{
        if(item1.completed < item2.completed){
            return 1;
        }
        else if(item1.completed > item2.completed){
            return -1;
        }
        else{
            return 0;
        }
    }
    sortByCompleted = () =>{
        let listItems = this.props.todoList.items;
        const {firebase} = this.props;
        if(!(this.state.completedSorted)){
            this.props.todoList.items.sort(this.compareCompletedIncreasing);
            let i = 0;
            for(i = 0; i < listItems.length; i++){
                listItems[i].key = i;
                listItems[i].id = i;
            }
            this.setState({completedSorted: true});
            this.props.changeName(this.props.todoList.id, firebase, this.props.todoList);
            this.forceUpdate();
        }
        else{
            this.props.todoList.items.sort(this.compareCompletedDecreasing);
            let i = 0;
            for(i = 0; i < listItems.length; i++){
                listItems[i].key = i;
                listItems[i].id = i;
            }
            this.setState({completedSorted: false});
            this.props.changeName(this.props.todoList.id, firebase, this.props.todoList);
            this.forceUpdate();
        }
    }
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div className="card z-depth-0 green darken-3">
                    <div className="card-content black-text">
                <div className="row">
                    <div className="col s3" onClick={this.sortByName}>
                    <h4 className="black-text text-darken-3"><u>Description</u></h4>
                    </div>
                    <div className="col s3" onClick={this.sortByDueDate}>
                    <h4 className="black-text text-darken-3"><u>Due Date</u></h4> 
                    </div>
                    <div className="col s3" onClick={this.sortByCompleted}>
                    <h4 className="black-text text-darken-3"><u>Completed</u></h4> 
                    </div>
                </div>
                </div>
                </div>
                {items && items.map(item => (
                        item.id = item.key,
                        <div>
                        <Link to={{pathname: '/todoList/' + todoList.id + '/item/' + item.id, 
                        state: {
                            todoList: todoList, 
                            items: items
                        }
                        }} key={item.id}>
                            <ItemCard todoList={todoList} item={item}/>
                        </Link>
                        </div>
                ))}
                
                <div>
                <Link to={{pathname: '/todoList/' + todoList.id + '/new_item', 
                state: {
                todoList: todoList, }}}>
                <div className="button_holder">
                <a id="add_button" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
                </div>
                </Link>
                </div>
            </div>
        ); 
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};
const mapDispatchToProps = dispatch => ({
    changeName: (id, firebase, todoList) => dispatch(changeNameHandler(id, firebase, todoList)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
    firebaseConnect()
)(ItemsList);