import React, { Component } from 'react'

import CreateEvent from './CreateEvent'
import AllEvents from './AllEvents'
import Modal from '../layout/Modal'
import Overlay from '../layout/Overlay'
import Loader from '../layout/Loader'

import AuthContext from '../../context/authContext'
import SingleEvent from './SingleEvent'

class Events extends Component {
    constructor (props) {
        super(props)
        this.titleField = React.createRef()
        this.descField = React.createRef()
        this.priceField = React.createRef()
        this.dateField = React.createRef()
        this.timeField = React.createRef()
        this.locationField = React.createRef()
    }

    static contextType = AuthContext

    isActive = true

    state = {
        loading: false,
        displayModal: false,
        events: [],
        poster: null,
        event: null
    }

    componentDidMount () {
        this.fetchEvents()
    }

    
    openModal = () => {
        this.setState({
            displayModal: true,
        })
    }
    
    closeModal = () => {
        this.setState({
            displayModal: false,
            event: null
        })
    }



    uploadHandler = e => {
        const poster = e.target.files[0].name
        
        this.setState({
            poster 
        })
    }

    onSubmit = () => {
        this.closeModal()

        const title = this.titleField.current.value.trim()
        const desc = this.descField.current.value.trim()
        const price = +this.priceField.current.value.trim()
        const date = this.dateField.current.value.trim()
        const time = this.timeField.current.value.trim()
        const location = this.locationField.current.value.trim()
        const poster = this.state.poster
        

        if (title.length === 0 || desc.length === 0 || date.length === 0 || time.length === 0 || location.length === 0 || price < 0){
            return
        }

        const reqBody = {
            query: `
                mutation CreateEvent ($title: String!, $desc: String!, $price: Number!, $date: String!, $time: String!, $location: String!, $poster: String!) { 
                    createEvent(eventInput: {
                        title: $title,
                        desc: $desc,
                        price: $price,
                        date: $date,
                        time: $time,
                        location: $location,
                        poster: $poster
                    }) {
                        title
                        desc
                        date
                        time
                        location
                        price
                        poster
                    }
                }
            `,

            variables: {title, desc, date, time, location, price, poster}
        }

        const token = this.context.token
        
        fetch('http://localhost:5000/api', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            const event = data.data.createEvent
            event.creator = {
                _id: this.context.userId
            }

            this.setState(previousState => {
                const events = [...previousState.events]
                events.push(event)

                return {
                    events
                }
            })
        })
        .catch(err => {
            throw err
        })
    }

    fetchEvents = () => {
        this.setState({ loading: true })

        const reqBody = {
            query: `
                query {
                    events {
                        _id
                        title
                        desc
                        date
                        time
                        location
                        price
                        poster
                        creator {
                            email
                            _id
                        }
                    }
                }
            `
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('http://localhost:5000/api', options)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const { events } = data.data
                
                // Check if component is still mounted.
                if (this.isActive) {
                    this.setState({
                        events,
                        loading: false
                    })
                }
                
            })
            .catch(err => {
                console.log(err)

                // Check if component is still mounted.
                if (this.isActive) {
                    this.setState({
                        loading: false
                    })
                }
            })

    }

    getEvent = id => {
        const event = this.state.events.find(e => e._id === id)

        if (event) {
            this.setState({
                event,
                eventExists: !this.state.eventExists
            })
        }

        
    }

    bookEvent = () => {
        if (!this.context.token) {
            this.setState({
                event: null
            })
            return;
        }

        const reqBody = {
            query: `
                mutation BookEvent ($id: ID!) {
                    bookEvent (eventId: $id) {
                        _id
                        createdAt
                        updatedAt
                    }
                }
            `,

            variables: {
                id: this.state.event._id
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
            console.log(data)
            this.setState({
                event: null
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentWillUnmount () {
        this.isActive = false
    }

    render () {
        return (        
            <React.Fragment>
                {this.context.token && <div className="contain fx-center fx-col">
                    <h1 className='title-2 mb-2'>Start an event and invite your friends!</h1>
                    <button className='btn btn-dk' onClick={this.openModal}>Create Event</button>
                </div>}

                {(this.state.displayModal || this.state.event) && <Overlay closeModal={this.closeModal}/>}

                {this.state.loading ? <Loader /> : <AllEvents events={this.state.events} user={this.context.userId} getEvent={this.getEvent}/>}


                {this.state.displayModal && (
                    <Modal 
                    title='Create Event'
                    desc="Fill in the form below to create your awesome event." 
                    closeModal={this.closeModal} 
                    canCancel 
                    canConfirm 
                    onConfirm={this.onSubmit}
                    confirmText='Save'
                    >
                        <CreateEvent
                            titleField={this.titleField}
                            descField={this.descField}
                            priceField={this.priceField}
                            dateField={this.dateField}
                            timeField={this.timeField}
                            locationField={this.locationField}
                            uploadHandler={this.uploadHandler}
                        />
                    </Modal>
                )}

                
                {this.state.event && (
                    <Modal 
                    title={this.state.event.title}  
                    canCancel
                    canConfirm 
                    closeModal={this.closeModal}
                    desc={this.state.event.desc}
                    onConfirm={this.bookEvent}
                    confirmText='Book'
                    id='event-detail'
                    creator={this.context.userId === this.state.event.creator._id}
                    >
                        <SingleEvent event={this.state.event} />
                    </Modal>
                )}

                

            </React.Fragment>
        )
    }
}

export default Events