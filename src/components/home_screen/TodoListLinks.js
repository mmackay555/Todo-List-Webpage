import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { changeNameHandler } from '../../store/database/asynchHandler';
import { firebaseConnect } from 'react-redux-firebase';

class TodoListLinks extends React.Component {
    render() {
        const {todoLists} = this.props;
        console.log(todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};
const mapDispatchToProps = (dispatch) => ({
    changeName: (id, firebase, todoList) => dispatch(changeNameHandler(id, firebase, todoList))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect())(TodoListLinks);