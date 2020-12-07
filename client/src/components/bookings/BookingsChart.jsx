import React from 'react'
import { Bar } from 'react-chartjs-2'

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

const BookingsChart = props => {
    const chartData = {labels: [], datasets: []}
    let values = []
    
    for (const range in ranges) {
        const filteredBookingsCount = props.bookings.reduce((prev, curr) => {
            if (curr.event.price > ranges[range].min && curr.event.price < ranges[range].max) {
                return prev + 1

            } else {
                return prev
            }
        }, 0)
        
        values.push(filteredBookingsCount)
        chartData.labels.push(range)
        chartData.datasets.push({
            fillColor: 'rgba(220,220,220,.5)',
            strokeColor: 'rgba(220,220,220,.8)',
            highlightFill: 'rgba(220,220,220,.75)',
            highlightStroke: 'rgba(220,220,220,1)',
            data: values
        })

        values = [...values]
        values[values.length-1] = 0
    }

    return (
        <Bar data={chartData} />
    )
}

export default BookingsChart