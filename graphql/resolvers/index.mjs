import bookingResolver from './bookingResolver.mjs'
import eventResolver from './eventResolver.mjs'
import authResolver from './authResolver.mjs'

export default {
    ...bookingResolver,
    ...eventResolver,
    ...authResolver
}