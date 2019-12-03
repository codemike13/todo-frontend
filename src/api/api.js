import { Axios } from './Axios'
import jwt_decode from 'jwt-decode'
import setAuthJWT from './setAuthJWT'

export const apiAuth = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)
        const currentTime = Date.now() / 1000

        if (decoded.exp < currentTime) {
            localStorage.removeItem('jwtToken')

            setAuthJWT(null)

            reject(null)
        } else {
            setAuthJWT(token)

            const user = {
                id: decoded.id,
                email: decoded.email
            }

            resolve(user)
        }
    })
}

export const apiHandleSignUpAndLogIn = (userInfo) => {
    return new Promise((resolve, reject) => {
        Axios.post('/users/signupandlogin', userInfo, axiosConfig)
            .then(result => {
                const { token } = result.data

                localStorage.setItem('jwtToken', token)

                const decoded = jwt_decode(token)

                setAuthJWT(token)

                resolve(decoded)
            })
            .catch(error => reject(error.response.data.message))
    })
}

export const apiHandleAddNewTodoList = (newTask) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)

        const newObj = {
            todo: newTask,
            id: decoded.id
        }
        Axios.post('/todo/createtodo', newObj, axiosConfig)
            .then(newTodo => resolve(newTodo.data))
            .catch(err => reject(err))
    })

}

export const apiHandleGetAllTodos = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)

        Axios.get(`/todo?id=${decoded.id}`)
            .then(result => resolve(result))
            .catch(error => reject(error))

    })
}

export const apiHandleNewEditTodobyID = (id, newTodo) => {
    return new Promise((resolve, reject) => {
        const newObj = {
            id,
            newTodo
        }
        // const token = localStorage.getItem('jwtToken')
        // const decoded = jwt_decode(token)
        Axios.put('/todo/updatetodobyid', newObj)
            .then(result => resolve(result.data))
            .catch(err => reject(err))
    })

}

export const apiHandleDeleteTodo = (todoId) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)
        const newObj = {
            todoId,
            user: decoded.id
        }
        Axios.put('/todo/deletetodobyid', newObj)
            .then(result => resolve(result.data))
            .catch(err => reject(err))
    })
}

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
}