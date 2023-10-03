import React from "react"
import {  useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import EditRoom from "./EditRoom"

function EditRoomPage() {
    const { pgDetailsId, roomId } = useParams()
    const rooms = useSelector((state)=>{
        return state.rooms.rooms
    })
    console.log('rooms', rooms)
    const filterRoom = rooms.find((ele)=>{
        return ele._id === roomId
    })
    console.log(filterRoom)
    return (
        <div>
        <EditRoom selectedRoom={filterRoom} pgDetailsId={pgDetailsId} />
        </div>
    )
}

export default EditRoomPage
