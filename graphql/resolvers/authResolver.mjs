import jwt from 'jsonwebtoken'
import { clean, hash, compare, settings } from '../../helpers.mjs'

import User from '../../models/User.mjs'

export default {

    createUser: async function (args) {
        try {
            const existing = await User.findOne({ email: args.userInput.email })

            if (!existing) {
                const user = new User ({
                    firstName: args.userInput.firstName,
                    lastName: args.userInput.lastName,
                    email: args.userInput.email,
                    password: hash(args.userInput.password),
                    avatar: args.userInput.avatar ? args.userInput.avatar : 'avatar.png',
                })
    
                await user.save()
    
                return clean(user)

            } else {
                throw new Error('User with that email already exists!')
            }
            

        } catch (err) {
            throw err
        }   
    },

    login: async function ({ email, password }) {
        try {
            const user = await User.findOne({ email })
            const hashedPassword = hash(password)

            if (!user) {
                throw new Error('User does not exist!')
            }

            const equal = compare(hashedPassword, user.password)

            if (!equal) {
                throw new Error('Password is incorrect!')
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, settings.secret, { expiresIn: '1h' })
                
            return {
                userId: user.id,
                token,
                tokenExpiry: 1
            }

        } catch (err) {
            throw err
        }
    }

}