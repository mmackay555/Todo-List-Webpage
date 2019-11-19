import React from 'react';
import { changeNameHandler } from '../../store/database/asynchHandler';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class TodoListCard extends React.Component {
    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 blue-grey darken-3 todo-list-link">
                <div className="card-content white-text text-darken-3">
                    <span className="card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return({
        auth: state.firebase.auth,
    }); 
};
const mapDispatchToProps = dispatch =>({
    changeName: (id, firebase, todoList) => dispatch(changeNameHandler(id, firebase, todoList))
});
export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect())(TodoListCard);