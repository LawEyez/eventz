import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
    event: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event'
    },

    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export default mongoose.model('Booking', BookingSchema)