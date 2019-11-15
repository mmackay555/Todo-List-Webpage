import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(item => (
                        item.id = item.key,
                        <Link to={{pathname: '/todoList/' + todoList.id + '/item/' + item.id, 
                        state: {
                            todoList: todoList, 
                            items: items
                        }
                        }} key={item.id}>
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                ))}
                
                <div>
                <Link to={{pathname: '/todoList/' + todoList.id + '/new_item', 
                state: {
                todoList: todoList, }}}>
                <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);