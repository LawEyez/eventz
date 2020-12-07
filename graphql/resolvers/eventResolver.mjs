import { formatEvent, dateString } from '../../helpers.mjs'

import Event from '../../models/Event.mjs'
import User from '../../models/User.mjs'

export default {
    events: async function () {
        try {
            let events = await Event.find()
            events = events.map(event => {
                return formatEvent(event)
            })

            return events

        } catch (err) {
            console.log(err)
            throw(err)
        }   
    },

    createEvent: async function (args, req) {
        if (!req.isAuthenticated) {
            throw new Error('Unauthorized access!')
        }

        try {
            const event = new Event ({
                title: args.eventInput.title,
                desc: args.eventInput.desc,
                price: +args.eventInput.price,
                date: dateString(args.eventInput.date),
                time: args.eventInput.time,
                location: args.eventInput.location,
                creator: req.user.id,
                poster: args.eventInput.poster ? args.eventInput.poster : 'poster.jpg'
            })

            const user = await User.findById(event.creator)

            if (user) {
                user.createdEvents.push(event)
                await user.save()
                
            } else {
                throw new Error('User not found!')
            }

            const newEvent = await event.save()

            return formatEvent(newEvent)

        } catch (err) {
            console.log(err)
            throw(err)
        }
    }
}