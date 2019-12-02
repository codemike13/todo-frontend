import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './components/Nav/Nav'
import TodoList from './components/TodoList/TodoList'
import {
    apiHandleAddNewTodoList,
    apiHandleGetAllTodos
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
        console.log(newTodoFromTodoList);

        apiHandleAddNewTodoList(newTodoFromTodoList)
            .then(createdNewTodo => {

                this.setState(({ todoLibrary }) => ({
                    ['all']: [...todoLibrary.all, createdNewTodo]
                }
                ), () => {
                    console.log('[index.js] ');

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