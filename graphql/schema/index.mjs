import graphql from 'graphql'
const { buildSchema } = graphql;

export default buildSchema(`
        type Booking {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updatedAt: String! 
        }

        type Event {
            _id: ID!
            title: String!
            desc: String!
            price: Float!
            date: String!
            time: String!
            location: String!
            creator: User!
            poster: String
        }

        type User {
            _id: ID!
            firstName: String!
            lastName: String!
            email: String!
            password: String
            avatar: String
            createdEvents: [Event!]
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiry: Int!
        }

        input EventInput {
            title: String!
            desc: String!
            price: Float!
            date: String!
            time: String!
            location: String!
            poster: String
        }

        input UserInput {
            firstName: String!
            lastName: String!
            email: String!
            password: String!
            avatar: String
        }

        type RootQuery {
            events: [Event!]!
            bookings: [Booking!]!
            login(email: String!, password: String!): AuthData!
        }

        type RootMutation {
            createUser(userInput: UserInput): User
            createEvent(eventInput: EventInput): Event
            bookEvent(eventId: ID!): Booking!
            cancelBooking(bookingId: ID!): Event!

        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)