import React, { Component } from 'react';

class NewListScreen extends Component{
    state = {
        name: "",
        user: false,
    }
    handleChecked = (e) => {
        const { target } = e;
        this.setState(state => ({
        ...state,
        [target.id]: target.checked,
    }));
}
    handleChange = (e) => {
        const { target } = e;
        this.setState(state => ({
        ...state,
        [target.id]: target.value,
    }));
}
    render() {
    return (
    <div id="new_list_item">
                <h3 id="new_list_heading">New List</h3>
                <div id="new_list_form_container">
                    <div id="name_prompt" class="item_prompt">Name:</div>
                    <input id="name" class="item_input" type="input" onChange= {this.handleChange}/>
                    <div id="user_prompt" class="item_prompt">Assigned To:</div>
                    <input id="user" class="item_input" type="input" onChange= {this.handleChange}/>
                </div>
            </div>
    
    );
}
}
export default NewListScreen;