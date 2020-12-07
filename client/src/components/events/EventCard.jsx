import React from 'react'

const EventCard = props => {
    const { event, user, getEvent } = props
    const poster = `/img/${event.poster}`

    return (
        <div className="event-card" key={event._id}>
            <div className="event-poster">
                <img src={poster} alt=""/>
            </div>
            <div className="event-card-body">
                <div className="dets-wrapper">
                    <h1>{event.title}</h1>
                    <p className='desc'>{event.desc.substr(0, 20)}</p>
                    <p className='loc'>
                        <i className="lni lni-map-marker"></i>
                        {event.location}
                    </p>
                </div>
                
                <div className="price-wrapper">
                    <p className='price'>
                        {event.price}
                        <span>kshs</span>
                        {event.creator._id !== user ? (
                            <button className='btn btn-sky' onClick={getEvent.bind(this, event._id)}>book</button> 
                        ) : <button className="btn btn-sky" onClick={getEvent.bind(this, event._id)}>view</button> }   
                    </p>
                </div>
                
            </div>
        </div>
    )
}

export default EventCard