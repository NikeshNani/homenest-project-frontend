import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { startShowSelectedRoom, startRemoveRoom, startGetAllRooms } from "../actions/roomActions"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"

const RoomsList = (props) => {
    const { pgDetailsId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(startGetAllRooms(pgDetailsId))
    }, [dispatch, pgDetailsId])

    const [showModal, setShowModal] = useState(false)
    const rooms = useSelector((state) => state.rooms.rooms)

    const sortedRooms = rooms.sort((a, b) => a.roomNumber - b.roomNumber)
    const selectedRoom = useSelector((state) => state.rooms.selectedRoom)

    const handleShowRoom = (roomId) => {
        dispatch(startShowSelectedRoom(roomId, pgDetailsId))
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleRemoveRoom = (roomId) => {
        dispatch(startRemoveRoom(roomId, pgDetailsId))
    }

    const handleEditRoom = (roomId) => {
        history.push(`/edit-room/${pgDetailsId}/${roomId}`)
    }

    return (
        <div>
        <h4 className="mb-3 text-center" style={{color: '#298384'}}>Total Rooms - {rooms.length}</h4>
        <div className="card">
            <div className="card-body" style={{ overflowY: "scroll", maxHeight: "400px" }}>
                {sortedRooms.map((room) => (
                    <div key={room._id} className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">Room Number: {room.roomNumber}</h5>
                            <div>
                                <button className="icon-button" onClick={() => handleShowRoom(room._id)}>
                                    <FaEye style={{ color: "blue" }} />
                                </button>
                                <button className="icon-button" onClick={() => handleEditRoom(room._id)}>
                                    <FaEdit style={{ color: "green" }} />
                                </button>
                                <button className="icon-button" onClick={() => handleRemoveRoom(room._id)}>
                                    <FaTrash style={{ color: "red" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={showModal} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>Room Details</ModalHeader>
                <ModalBody>
                    {selectedRoom && (
                        <div>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><strong>Room Number :</strong></td>
                                        <td>{selectedRoom.roomNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Sharing :</strong></td>
                                        <td>{selectedRoom.sharing}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Floor :</strong></td>
                                        <td>{selectedRoom.floor}</td>
                                    </tr>

                                    
                                </tbody>
                            </table>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
        </div>
    )
}

export default RoomsList
