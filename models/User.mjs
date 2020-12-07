import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    createdEvents: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Event'
        }
    ],
    
    avatar: {
        type: String
    }
})

export default mongoose.model('User', UserSchema)