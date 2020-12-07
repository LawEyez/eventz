import React, { Component } from 'react'

import AuthContext from '../../context/authContext'

import Loader from '../layout/Loader'
import AllBookings from './AllBookings'
import BookingControls from './BookingControls'
import BookingsChart from './BookingsChart'

class Bookings extends Component {
    state = {
        isLoading: false,
        bookings: [],
        type: 'list'
    }

    static contextType = AuthContext

    componentDidMount () {
        this.fetchBookings()
    }

    fetchBookings = () => {
        const reqBody = {
            query: `
                query {
                    bookings {
                        _id
                        createdAt
                        event {
                            _id
                            title
                            date
                            price
                        }
                    }
                }
            `
        }

        fetch('http://localhost:5000/api', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.token}`
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            const { bookings } = data.data
            this.setState({ bookings })
        })
        .catch(err => {
            console.log(err)
        })
    }

    cancelBooking = id => {
        const reqBody = {
            query: `
                mutation CancelBooking ($id: ID!) {
                    cancelBooking (bookingId: $id) {
                        _id
                        title
                    }
                }
            `,

            variables: {
                id
            }
        }

        fetch('http://localhost:5000/api', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.token}`
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            const bookings = this.state.bookings.filter(booking => booking._id !== id)
            this.setState({ bookings })
        })
        .catch(err => {
            console.log(err)
        })        
    }

    changeContent = type => {
        if (type === 'list') {
            this.setState({type: 'list'})

        } else {
            this.setState({type: 'chart'})
        }
    }

    render () {
        let content = <Loader />

        if (!this.state.isLoading) {
           content = (
            <React.Fragment>
                <BookingControls changeContent={this.changeContent} type={this.state.type} />
                {this.state.type === 'list' ? <AllBookings bookings={this.state.bookings} cancelBooking={this.cancelBooking} /> : <BookingsChart bookings={this.state.bookings} />}
            </React.Fragment>
           )
        }

        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        )
    }
}

export default Bookings