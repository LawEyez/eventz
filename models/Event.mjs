import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },

    poster: {
        type: String
    }
})

export default mongoose.model('Event', EventSchema)