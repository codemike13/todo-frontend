
import React, { Component } from 'react'

export default class Todo extends Component {
    render() {
        console.log(this.props);

        return (
            <div>{this.props.name}</div>
        )
    }
}