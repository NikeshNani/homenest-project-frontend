import React from "react"
import RoomsList from "./RoomsList"
import AvailableRooms from "./AvailableRooms"
import UnAvailableRooms from "./UnAvailableRooms"

const RoomDetails = (props) => {
    return (
        <div>
            <h3 className="mb-3 text-center" style={{color : '#EE6C13'}}>Room Details</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 1, marginRight: "10px" }}>
                    <RoomsList />
                </div>
                <div style={{ flex: 1 }}>
                    <AvailableRooms /> < br />
                    <UnAvailableRooms />
                </div>
            </div>
        </div>
    )
}

export default RoomDetails