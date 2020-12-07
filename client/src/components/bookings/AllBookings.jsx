import React from 'react'

const AllBookings = props => {
    const bookings = props.bookings.map(booking => (
        <li key={booking._id}>
            {booking.event.title} - {booking.createdAt}
            <button className="btn" onClick={props.cancelBooking.bind(this, booking._id)}>Cancel booking</button>
        </li>
    )) 

    return (
        <ul>
            {bookings}
        </ul>
    )
}

export default AllBookings