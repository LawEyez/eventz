import { formatBooking, formatEvent } from '../../helpers.mjs'

import Booking from '../../models/Booking.mjs'
import Event from '../../models/Event.mjs'

export default {

    bookings: async function (args, req) {
        try {
            if (!req.isAuthenticated) {
                throw new Error('Unauthorized access!')
            }

            const bookings = await Booking.find({ user: req.user.id })
            
            return bookings.map(booking => {
                return formatBooking(booking)
            })

        } catch (err) {
            console.log(err)
            throw err
        }
    },

    bookEvent: async function (args, req) {
        try {
            if (!req.isAuthenticated) {
                throw new Error('Unauthorized access!')
            }

            const event = await Event.findOne({ _id: args.eventId })
            const booking = new Booking({
                user: req.user.id ,
                event
            })

            const savedBooking = await booking.save()

            return formatBooking(savedBooking)

        } catch (err) {
            console.log(err)
            throw err
        }
    },

    cancelBooking: async function (args, req) {
        try {
            if (!req.isAuthenticated) {
                throw new Error('Unauthorized access!')
            }

            const booking = await Booking.findById(args.bookingId).populate('event')
            const event = formatEvent(booking.event)

            if (booking.user.toString() === req.user.id) {
                await Booking.deleteOne({ _id: args.bookingId})
                return event

            } else {
                throw new Error('Unauthorized!')
            }
            

        } catch (err) {
            throw err
        }
    }
}