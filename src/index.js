import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './components/Nav/Nav'
import TodoList from './components/TodoList/TodoList'
import {
    apiHandleAddNewTodoList,
    apiHandleGetAllTodos,
    apiHandleNewEditTodobyID,
    apiHandleDeleteTodo
} from './api/api'

class App extends Component {
    state = {
        todoLibrary: {},
        selected: 'all',
        isAuth: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isAuth === true && prevState.isAuth === false) {
            this.appHandleGetAllTodos()
        }
    }

    appHandleAuthSubmit = () => {
        this.setState({
            isAuth: true
        })
    }

    appHandleLogout = () => {
        this.setState({
            isAuth: false
        })
    }

    appHandleAddNewTodoList = (newTodoFromTodoList) => {

        apiHandleAddNewTodoList(newTodoFromTodoList)
            .then(createdNewTodo => {

                this.setState(({ todoLibrary }) => ({
                    ['all']: [...todoLibrary.all, createdNewTodo]
                }
                ), () => {

                })
            })
            .catch(err => {
                console.log('err: ', err);

            })
    }

    appHandleGetAllTodos = () => {
        apiHandleGetAllTodos()
            .then(allTodos => {
                this.setState(({ todoLibrary }) => ({
                    todoLibrary: {
                        ...todoLibrary,
                        ['all']: allTodos.data.todos
                    }
                }), () => {
                    //getAllUpdated
                    //
                })
            })
            .catch(error => console.log('error: ', error))
    }

    appHandleNewEditTodoByID = (id, newTodo) => {
        apiHandleNewEditTodobyID(id, newTodo)
            .then(updatedTodo => {
                // console.log(`[index.js] appHandleNewEditTodoByID Todo ID: ${id} , Updated todo: ${newTodo}`);
                const newLib = this.state.todoLibrary['all'].map(item => {
                    if (item._id === id) item.todo = updatedTodo.todo
                    return item
                })
                this.setState(({ todoLibrary }) => ({
                    todoLibrary: {
                        ...todoLibrary,
                        ['all']: newLib
                    }
                }))
            })
            .catch(err => {
                console.log(err);
            })
    }

    appHandleDeleteTodo = (id) => {

        apiHandleDeleteTodo(id)
            .then(result =>
                this.appHandleGetAllTodos())
            .catch(err => {
                console.log(err);
            })
        // console.log(`[index.js] from appHandleDeleteTodo id: ${id} Delete todo: `)
    }


    render() {
        return (
            <div className='App' >
                <Nav
                    appHandleAuthSubmit={this.appHandleAuthSubmit}
                    appHandleLogout={this.appHandleLogout}
                />
                {this.state.isAuth ? (
                    <>
                        <div id='category'>
                            <ul>
                                <li>
                                    <a href='/'>All todos</a>
                                </li>
                                <li>
                                    <a href='/'>Current todos</a>
                                </li>
                                <li>
                                    <a href='/'>Done todos</a>
                                </li>
                            </ul>
                        </div>
                        <TodoList
                            appHandleAddNewTodoList={this.appHandleAddNewTodoList}
                            todoList={this.state.todoLibrary['all']}
                            appHandleNewEditTodoByID={this.appHandleNewEditTodoByID}
                            appHandleDeleteTodo={this.appHandleDeleteTodo}
                        />
                    </>
                ) : (
                        <h1>You need to Login to use this App</h1>
                    )
                }
            </div >
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));