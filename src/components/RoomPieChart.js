import React from 'react'
import { useSelector } from 'react-redux'
import Chart from 'react-google-charts'

const RoomPieChart = () => {
    const availableRooms = useSelector((state) => state.rooms.availableRooms)
    const unAvailableRooms = useSelector((state) => state.rooms.unAvailableRooms)
    const rooms = useSelector((state) => state.rooms.rooms)

    const chartData = [
        ['Task', 'Count'],
        ['Rooms',rooms.length],
        ['Available Rooms', availableRooms.length],
        ['Unavailable Rooms', unAvailableRooms.length],
    ]
    const showTitle = rooms.length > 0 // Condition to show the title

    return (
        <div>
        <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
                title: showTitle ? 'Rooms Availability' : '', // Conditional title
            }}
            rootProps={{ 'data-testid': '1' }}
        />
        </div>
    )
}

export default RoomPieChart
