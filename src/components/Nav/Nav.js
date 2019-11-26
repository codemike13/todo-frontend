
import React, { Component } from 'react'
import Axios from 'axios'

class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            isAuth: false
        }
    }

    handleInputOnChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleInputOnSubmit = (event) => {
        event.preventDefault()

        Axios({
            method: 'POST',
            url: 'http://localhost:4000/users/signupandlogin',
            data: {
                email:    this.state.email,
                password: this.state.password
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <nav className='navbar navbar-light bg-light'>
                <a className='navbar-brand' href='\'>CODE IMMERSIVES</a>
                <form 
                    className='form-inline'
                    onSubmit={ this.handleInputOnSubmit }
                >
                    <input 
                        type='text' 
                        placeholder='email'    
                        className='form-control mr-sm-2'
                        name='email'
                        onChange={ this.handleInputOnChange }
                    />
                    <input 
                        type='text' 
                        placeholder='password' 
                        className='form-control mr-sm-2'
                        name='password'
                        onChange={ this.handleInputOnChange }
                    />
                    <button className='btn btn-outline-success my-2 my-sn-0'>Sign Up | Sign In</button>
                </form>
            </nav>
        )
    }
}
export default Nav