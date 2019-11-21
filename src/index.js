import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './components/Nav/Nav'


class App extends Component {
    render() {
        return (
            <div className="app">
                <Nav />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


