import React from 'react';
import Button from 'react-materialize/lib/Button';
import {Icon} from 'react-materialize'
import { changeNameHandler } from '../../store/database/asynchHandler';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

class ItemCard extends React.Component {
    moveUp = (e) =>{
        e.preventDefault();
        const{todoList, item} = this.props;
        const {firebase} = this.props;
        let listItems = todoList.items;
        let tempListItem = todoList.items[item.key];
        let key = item.key;
        let keyMinus = item.key - 1;
        let tempListItemKeyMinus = listItems[keyMinus];
        listItems[key] = listItems[keyMinus];
        listItems[keyMinus] = tempListItem;
        let tempKey = tempListItem.key;
        tempListItem.key = tempListItemKeyMinus.key;
        tempListItemKeyMinus.key = tempKey;
        let tempID = tempListItem.id;
        tempListItem.id = tempListItemKeyMinus.id;
        tempListItemKeyMinus.id = tempID;
        this.props.changeName(this.props.todoList.id, firebase, this.props.todoList);
        this.forceUpdate();
    }
    moveDown = (e) =>{
        e.preventDefault();
        const{todoList, item} = this.props;
        const {firebase} = this.props;
        let listItems = todoList.items;
        let key = item.key;
        let tempListItem = listItems[key];
        let keyPlus = key+1;
        let tempListItemKeyPlus = listItems[keyPlus];
        listItems[key] = listItems[keyPlus];
        listItems[keyPlus] = tempListItem;
        let tempKey = tempListItem.key
        tempListItem.key = tempListItemKeyPlus.key;
        tempListItemKeyPlus.key = tempKey;
        let tempID = tempListItem.id;
        tempListItem.id = tempListItemKeyPlus.id;
        tempListItem.id = tempID;
        this.props.changeName(this.props.todoList.id, firebase, this.props.todoList);
        this.forceUpdate();
    }
    deleteItem = (e) =>{
        e.preventDefault();
        const{firebase} = this.props;
        let key = this.props.item.key;
        let listItems = this.props.todoList.items;
        let i;
        let keyPlus = key + 1;
        for(i = keyPlus; i < listItems.length; i++){
            let currentKey = listItems[i].key;
            let currentKeyMinus = currentKey - 1;
            listItems[i].key = currentKeyMinus;
        }
        listItems.splice(key, 1);
        this.props.changeName(this.props.todoList.id, firebase, this.props.todoList);
        this.forceUpdate();
    }
    render() {
        const { item } = this.props;
        if(item.completed){
            return (
                <div className="card z-depth-0 teal pink-lighten-3">
                    <div className="card-content black-text text-darken-3">
                        <span className="card-title">{item.description}</span>
                        <div className="row">
                            <div className="col s3">
                                <p>Assigned To: {item.assigned_to}</p>
                            </div>
                            <div className="col s3">
                                <p>{item.due_date}</p>
                            </div>
                            <div className="col s3">
                                <p>Completed</p>
                            </div>
                            <div className="col s1 offset-2">
                            <Button floating="true" fab={{direction: 'left'}} id="fab_up_down_delete" className="red" waves="light">
                                    <Button icon={<Icon>arrow_upward</Icon>} onClick={this.moveUp}></Button>
                                    <Button icon={<Icon>arrow_downward</Icon>} onClick={this.moveDown}></Button>
                                    <Button icon={<Icon>delete</Icon>} onClick={this.deleteItem}></Button>
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="card z-depth-0 teal pink-lighten-3">
                    <div className="card-content black-text text-darken-3">
                        <span className="card-title">{item.description}</span>
                        <div className="row">
                            <div className="col s3">
                                <p>Assigned To: {item.assigned_to}</p>
                            </div>
                            <div className="col s3">
                                <p>{item.due_date}</p>
                            </div>
                            <div className="col s3">
                                <p>Pending</p>
                            </div>
                            <div className="col s1 offset-2">
                            <Button floating="true" fab={{direction: 'left'}} id="fab_up_down_delete" className="red" waves="light">
                                    <Button icon={<Icon>arrow_upward</Icon>} onClick={this.moveUp}></Button>
                                    <Button icon={<Icon>arrow_downward</Icon>} onClick={this.moveDown}></Button>
                                    <Button icon={<Icon>delete</Icon>} onClick={this.deleteItem}></Button>
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    const item = ownProps.item;
    return {
        todoList, item,
        auth: state.firebase.auth,
    };
};
const mapDispatchToProps = dispatch =>({
    changeName: (id, firebase, todoList) => dispatch(changeNameHandler(id, firebase, todoList)),
});
export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect())(ItemCard);