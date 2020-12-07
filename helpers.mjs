import mongoose from 'mongoose'
import crypto from 'crypto'
import DataLoader from 'dataloader'

import User from './models/User.mjs'
import Event from './models/Event.mjs'

export const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(settings.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

        if (connection) {
            console.log('MongoDB connected successfully...')
        } else {
            throw new Error('Failed to connect to Mongo!')
        }
        
        
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const settings = {
    // mongoURI: "mongodb+srv://Bioga:Afordia2020@cluster0.nry9p.mongodb.net/eventz-local?retryWrites=true&w=majority",
    // mongoURI: "mongodb+srv://allen2020:Afordia2020@allen.fuafk.mongodb.net/eventz?retryWrites=true&w=majority",
    mongoURI: "mongodb://localhost:27017/eventz",
    secret: "victoria's secret"
}

export const hash = str => {
    return crypto.createHmac('sha256', settings.secret).update(str).digest('hex')
}

export const clean = user => {
    return {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }
}

const eventLoader = new DataLoader(eventIds => {
    return getEvents(eventIds)
})

const userLoader = new DataLoader(userIds => {
    return User.find({_id: {$in: userIds}})
})

export const getCreator = async id => {
    try {
        const user = await userLoader.load(id.toString())

        return {
            ...user._doc,
            createdEvents: eventLoader.loadMany.bind(this, user._doc.createdEvents)
        }

    } catch (err) {
        throw err
    }
}

export const getSingleEvent = async id => {
    try {
        const event = await eventLoader.load(id.toString())
        return event

    } catch (err) {
        throw err
    }
}

export const getEvents = async ids => {
    try {
        const events = await Event.find({ _id: {$in: ids}})
        return events.map(event => {
            return formatEvent(event)
        })
    } catch (err) {
        throw err
    }
}

export const formatEvent = event => {
    return {
        ...event._doc,
        creator: getCreator.bind(this, event.creator),
        date: dateString(event._doc.date)
    }
}

export const formatBooking = booking => {
    return {
        ...booking._doc,
        user: getCreator.bind(this, booking._doc.user),
        event: getSingleEvent.bind(this, booking._doc.event),
        createdAt: dateString(booking._doc.createdAt),
        updatedAt: dateString(booking._doc.updatedAt),
    }
}

export const dateString = date => new Date(date).toDateString()

export const compare = (str1, str2) => str1 === str2



