import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const newListHandler = (todoList, firebase) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection('todoLists').add({
    name: todoList.name,
    owner: todoList.owner,
    items: [],
  }).then(() => {
    dispatch(actionCreators.createTodoList);
  }).catch((err) => {
    dispatch(actionCreators.createTodoListError)
  })
};

export const changeNameHandler = (id, firebase, todoList) => (getState, { getFirestore }) => {
  const firestore = firebase.firestore();
  const collection = firestore.collection('todoLists').doc(id);
  collection.set({
    name: todoList.name,
    owner: todoList.owner,
    items: todoList.items
  });
};
export const changeOwnerHandler = (id, firebase, todoList) => (getState, { getFirestore }) => {
  const firestore = firebase.firestore();
  const collection = firestore.collection('todoLists').doc(id);
  collection.set({
    name: todoList.name,
    owner: todoList.owner,
    items: todoList.items
  });
};
export const changeItemHandler = (id, firebase, items, todoList) => (getState) => {
  const firestore = firebase.firestore();
  const collection = firestore.collection('todoLists').doc(id);
  collection.set({
    name: todoList.name,
    owner: todoList.owner,
    items: items
  });
};
export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};