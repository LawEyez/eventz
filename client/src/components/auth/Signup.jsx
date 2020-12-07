import React, { Component } from 'react'

class Signup extends Component {
    constructor (props) {
        super(props)
        this.firstNameField = React.createRef()
        this.lastNameField = React.createRef()
        this.passwordField = React.createRef()
        this.emailField = React.createRef()
    }

    onSubmit = e => {
        e.preventDefault()

        const firstName = this.firstNameField.current.value.trim()
        const lastName = this.lastNameField.current.value.trim()
        const email = this.emailField.current.value.trim()
        const password = this.passwordField.current.value.trim()

        if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0) {
            return;
        }

        const reqBody = {
            query: `
                mutation Signup ($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
                    createUser(userInput: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}) {
                        _id
                        email
                    }
                }
            `,

            variables: { firstName, lastName, email, password }
        }

        fetch('http://localhost:5000/api', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log('Failed!')
                throw new Error('Failed!')
            }

            return res.json()
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    render () {
        return (
            <div className="">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group mb-2">
                        <div className="icon-wrapper">
                            <i className="lni lni-user"></i>
                        </div>

                        <input type="text" name="firstName" placeholder="First Name" ref={this.firstNameField} />
                    </div>

                    <div className="form-group mb-2">
                        <div className="icon-wrapper">
                            <i className="lni lni-user"></i>
                        </div>

                        <input type="text" name="lastName" placeholder="Last Name" ref={this.lastNameField} />
                    </div>

                    <div className="form-group mb-2">
                        <div className="icon-wrapper">
                            <i className="lni lni-envelope"></i>
                        </div>

                        <input type="email" name="email" placeholder="Email" ref={this.emailField} />
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

export default Signup