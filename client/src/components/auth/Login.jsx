import React, { Component } from 'react'

import AuthContext from '../../context/authContext'

class Login extends Component {
    constructor(props) {
        super(props)
        this.emailField = React.createRef()
        this.passwordField = React.createRef()
    }

    static contextType = AuthContext

    onSubmit = e => {
        e.preventDefault()
        const email = this.emailField.current.value.trim()
        const password = this.passwordField.current.value.trim()

        if (email.length === 0 || password.length === 0) {
            return;
        }
        
        const reqBody = {
            query: `
                query Login ($email: String!, $password: String!){
                    login(email: $email, password: $password) {
                        token
                        userId
                    }
                }
            `,
             
            variables: { email, password }
        }

        fetch('http://localhost:5000/api', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            const { token, userId, tokenExpiry } = data.data.login

            if (token) {
                this.context.login(token, userId, tokenExpiry)
            }
        })
        .catch(err => {
            console.log(err)
            throw err
        })
    }

    render () {
        return (
            <div className="">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group mb-2">
                        <div className="icon-wrapper">
                            <i className="lni lni-envelope"></i>
                        </div>
                        <input type="text" name="email" placeholder="Email Address" ref={this.emailField} />
                    </div>

                    <div className="form-group mb-2">
                        <div className="icon-wrapper">
                            <i className="lni lni-key"></i>
                        </div>                        
                        <input type="password" name="password" placeholder="Password" ref={this.passwordField} />
                    </div>

                    <button className="btn" type="submit">Submit</button>
                </form>
            </div>                    
        )
    }
}

export default Login