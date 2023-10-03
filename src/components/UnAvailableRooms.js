import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetUnAvailableRooms } from "../actions/roomActions"
import { useParams } from "react-router-dom"

const UnAvailableRooms = (props) => {
    const { pgDetailsId } = useParams()
    const unAvailableRooms = useSelector((state) => {
        return state.rooms.unAvailableRooms
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetUnAvailableRooms(pgDetailsId))
    }, [dispatch, pgDetailsId])

    const sortedRooms = unAvailableRooms.sort((a, b) => {
        return a.roomNumber - b.roomNumber
    })

    return (
        <div>
            <h4 className="mb-3 text-center" style={{color: '#9A32E7'}}>Un-Available Rooms</h4>
            <div className="card">
                <div className="card-body" style={{ overflowY: "scroll", maxHeight: "165px" }}>
                    <p className="card-title" style={{color: '#C12C3B'}}>
                        Total Unavailable Rooms: {unAvailableRooms.length}
                    </p>
                    <ul>
                        {sortedRooms.map((room) => {
                            return (
                                <li key={room._id}>Room Number: {room.roomNumber}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            </div>
    )
}

export default UnAvailableRooms
