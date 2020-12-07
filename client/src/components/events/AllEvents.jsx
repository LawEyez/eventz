import React from 'react'

import EventCard from './EventCard'

const AllEvents = props => {
    const events = props.events.map(event => {
        return (
            <EventCard key={event._id} event={event} user={props.user} getEvent={props.getEvent} />
        )
    })

    return (
        <div className="events-grid">
            {events}  
        </div>
    )
}

export default AllEvents