import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { startEditRoom } from "../actions/roomActions"
import { FaArrowLeft } from 'react-icons/fa'
const EditRoom = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { selectedRoom, pgDetailsId } = props

    const [roomNumber, setRoomNumber] = useState(selectedRoom.roomNumber)
    const [sharing, setSharing] = useState(selectedRoom.sharing)
    const [floor, setFloor] = useState(selectedRoom.floor)

    const handleSave = () => {
        // Create an object with the updated room data
        const updatedRoom = {
        roomNumber,
        sharing,
        floor,
        }
        console.log(updatedRoom)
        const reset = () => {
            // Reset the form fields
            setRoomNumber("")
            setSharing("")
            setFloor("")
        }
        
        dispatch(startEditRoom(selectedRoom._id, pgDetailsId , updatedRoom, reset))
        // Redirect to the admin dashboard
        history.push(`/admindashboard/${pgDetailsId}`)
    }

    const handleCancel = () => {
        // Redirect to the admin dashboard of the selected PG when cancel is clicked
        history.push(`/admindashboard/${pgDetailsId}`)
    }

    return (
        <div className="text-center">
            <div
                style={{
                    border: '1px solid',
                    padding: '20px',
                    borderRadius: '5px',
                    maxWidth: '400px',
                    margin: '0 auto',
                    marginTop: '20px'
                }}
            >
                <h2>Edit Room</h2>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <label>Room Number:</label>
                    <input
                        type="text"
                        name="roomNumber"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        required
                        style={{ margin: '5px', padding: '10px' }}
                    />
                    <br/>
                    <label>Sharing:</label>
                    <input
                        type="text"
                        name="sharing"
                        value={sharing}
                        onChange={(e) => setSharing(e.target.value)}
                        required
                        style={{ margin: '5px', padding: '10px' }}
                    />
                    <br/>
                    <label>Floor:</label>
                    <input
                        type="text"
                        name="floor"
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        required
                        style={{ margin: '5px', padding: '10px' }}
                    />
                    <button
                        type="button"
                        onClick={handleSave}
                        style={{
                            margin: '5px',
                            padding: '10px',
                            backgroundColor: '#5CBDB6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px'
                        }}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        style={{
                            margin: '5px',
                            padding: '10px',
                            backgroundColor: '#64B2E4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px'
                        }}
                    >
                        <FaArrowLeft style={{ marginRight: '5px' }} /> Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditRoom

