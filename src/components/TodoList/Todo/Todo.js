
import React, { Component } from 'react'

export default class Todo extends Component {
    state = {
        isToggle: false,
        newEditTodo: this.props.item,
        currentTodo: this.props.item
    }

    buttonClicked = () => {
        this.setState((prevState) => {
            return {
                isToggle: !prevState.isToggle,
                newEditTodo: this.state.currentTodo
                // this.state.currentTodo: this.props.item
            }
        })
    }
    handleInputOnChange = (event) => {// This line sets the value in the input box to the .name value of the corresponding user value that will be sent in the POST
        this.setState({
            newEditTodo: event.target.value
        })
    }

    deleteTodo = () => {

    }


    render() {
        const {
            item,
            id,
            todoHandleNewEditTodoByID,
            todoHandleDeleteByID
        } = this.props

        return (
            <li className="todo-Li">
                {(this.state.isToggle === false) ? (
                    <>
                        <span id="text"> {this.props.item}</span>

                        <button onClick={this.buttonClicked} className="buttonClass btn btn-success"> Edit </button>
                        <button className='buttonClass btn btn-danger' onClick={() => { todoHandleDeleteByID(id) }} >Delete</button>
                    </>
                ) : (
                        <>
                            <input
                                onChange={this.handleInputOnChange}
                                defaultValue={this.props.item}
                            ></input>
                            <button className='buttonClass btn btn-danger' onClick={this.buttonClicked}>Cancel</button>
                            <button className='buttonClass btn btn-primary'
                                disabled={(this.state.newEditTodo === this.state.currentTodo ? true : false)}
                                onClick={() => { todoHandleNewEditTodoByID(id, this.state.newEditTodo); this.buttonClicked() }}
                            >Submit</button>


                        </>

                    )}


            </li>
        )
    }
}