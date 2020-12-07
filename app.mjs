import express from 'express'
import expressGraphql from 'express-graphql'

import { connectDatabase } from './helpers.mjs'
import isAuth from './middleware/isAuth.mjs'
import schema from './graphql/schema/index.mjs'
import resolvers from './graphql/resolvers/index.mjs'

const app = express()
const port = process.env.PORT || 5000
const { graphqlHTTP } = expressGraphql

connectDatabase()        

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }

    next();
})

app.use(isAuth)

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(port, () => console.log(`Server running on port ${port}`))