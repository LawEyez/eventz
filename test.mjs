import { compare } from './helpers.mjs'

const str1 = 'allen'
const str2 = 'allen'

// console.log(compare(str1, str2))

const ranges = {
    'Cheap': {
        min: 0,
        max: 1500
    },

    'Normal': {
        min: 1500,
        max: 4000
    },

    'Expensive': {
        min: 4000,
        max: 100000
    }
}

const prices = [500, 700, 9900, 10000, 3120, 3145, 3150, 1690, 19000, 5000, 1000, 1500]

const output = []

for (const range in ranges) {
    prices.reduce((prevVal, currVal) => {
        console.log(prevVal)
    }, 0)
}

