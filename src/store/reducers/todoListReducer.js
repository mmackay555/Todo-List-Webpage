const initState = {
    todoLists: [],
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        case 'CREATE_TODO_LIST':
            return state;
        case 'CREATE_TODO_LIST_ERROR':
            return state;
        default:
            return state;
            break;
    }
};

export default todoListReducer;