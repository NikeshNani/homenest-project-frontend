import React, { useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { startCreateRoom, startGetUnAvailableRooms, startGetAllRooms, startGetAvailableRooms } from '../actions/roomActions'
import { RoleContext } from './NavBar'
import { FaArrowLeft } from 'react-icons/fa'

const AddRoom = (props) => {
  const { role } = useContext(RoleContext)
  const [sharing, setSharing] = useState('')
  const [numRoomsToGenerate, setNumRoomsToGenerate] = useState('')
  const [generateRooms, setGenerateRooms] = useState([])

  const { pgDetailsId } = useParams() // Use the useParams hook to get pgDetailsId
  const history = useHistory() // Use the useHistory hook to access the history object

  const dispatch = useDispatch()

  useEffect(() => {
    // Dispatch actions to get available rooms and all rooms on component mount
    dispatch(startGetAvailableRooms(pgDetailsId))
    dispatch(startGetAllRooms(pgDetailsId))
    dispatch(startGetUnAvailableRooms(pgDetailsId))
  }, [dispatch, pgDetailsId])

  const handleSharingChange = (e) => {
    setSharing(e.target.value)
  }

  const handleNumRoomsChange = (e) => {
    setNumRoomsToGenerate(Number(e.target.value))
  }

  const handleGenerate = () => {
    const newRooms = Array(numRoomsToGenerate).fill({
      roomNumber: '',
      floor: '',
    })
    setGenerateRooms(newRooms)
  }

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...generateRooms]
    updatedRooms[index] = {
      ...updatedRooms[index],
      [field]: value,
    }
    setGenerateRooms(updatedRooms)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Create arrays for room numbers and floors
    const roomNumbers = generateRooms.map((room) => room.roomNumber)
    const floors = generateRooms.map((room) => room.floor)
    const formData = {
      sharing: sharing,
      roomNumber: roomNumbers,
      floor: floors,
    }

    const reset = () => {
      setSharing('')
      setNumRoomsToGenerate('')
      setGenerateRooms([])
    }

    try {
      console.log('pgDetailsId-add-room', pgDetailsId)
      await dispatch(startCreateRoom(formData, pgDetailsId, reset))
    } catch (e) {
      console.error(e.message)
    }
  }

  const handleGoToAdminDashboard = () => {
    // Redirect to the "Admin dashboard" component for the selected PG
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
        {role === 'pg_admin' && (
          <div>
            <h2>Add Rooms</h2>
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <label>Sharing:</label>
              <input
                type="text"
                value={sharing}
                onChange={handleSharingChange}
                required
                style={{ margin: '5px', padding: '10px' }}
              />
              <br />
              <label>Number of Rooms to Generate:</label>
              <input
                type="number"
                value={numRoomsToGenerate}
                onChange={handleNumRoomsChange}
                required
                style={{ margin: '5px', padding: '10px' }}
              />
              <button
                type="button"
                onClick={handleGenerate}
                style={{
                  margin: '5px',
                  padding: '10px',
                  backgroundColor: '#F46C28',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px'
                }}
              >
                Generate Rooms
              </button>
              {generateRooms.length > 0 && (
                <div
                  style={{
                    maxHeight: '200px', // Set a maximum height
                    overflowY: 'auto', // Add vertical scrolling when content exceeds the height
                    margin: '5px',
                    padding: '10px',
                    width: '100%', // Set a width to ensure it stays within the card
                  }}
                >
                  <table style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Room</th>
                        <th>Room Number</th>
                        <th>Floor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generateRooms.map((room, index) => (
                        <tr key={index}>
                          <td>Room {index + 1}</td>
                          <td>
                            <input
                              type="text"
                              value={room.roomNumber}
                              onChange={(e) =>
                                handleRoomChange(
                                  index,
                                  'roomNumber',
                                  e.target.value
                                )
                              }
                              required
                              style={{ margin: '5px', padding: '10px' }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={room.floor}
                              onChange={(e) =>
                                handleRoomChange(index, 'floor', e.target.value)
                              }
                              required
                              style={{ margin: '5px', padding: '10px' }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <button
                type="submit"
                style={{
                    margin: '5px',
                    padding: '10px',
                    backgroundColor: '#5CBDB6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px'
                }}
              >
                Submit
              </button>
            </form>
            <button
              onClick={handleGoToAdminDashboard}
              style={{
                margin: '5px',
                padding: '10px',
                backgroundColor: '#64B2E4',
                color: 'white',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              <FaArrowLeft style={{ marginRight: '5px' }} /> Go to Admin Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddRoom
