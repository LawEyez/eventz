import React from 'react'

const BookingControls = props => {
    return (
        <div>
            <button className={props.type === 'list' ? 'active' : ''} onClick={props.changeContent.bind(this, 'list')}>List</button>
            <button className={props.type === 'chart' ? 'active' : ''} onClick={props.changeContent.bind(this, 'chart')}>Chart</button>
        </div>
    )
}

export default BookingControls