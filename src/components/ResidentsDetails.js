import React, { useContext, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startGetResidentPayments, startGetSingleResident, startRemoveResident } from "../actions/residentsActions"
import { RoleContext } from "./NavBar"
import { useParams, useHistory } from "react-router-dom"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "reactstrap"
// Import icons from react-icons
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa'

const ResidentsDetails = (props) => {
    const { role } = useContext(RoleContext)
    const { pgDetailsId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [showModal, setShowModal] = useState(false)
    const [searchInput, setSearchInput] = useState("") // State for search input
    const [filteredResidents, setFilteredResidents] = useState([])

    useEffect(() => {
        dispatch({ type: "CLEAR_SELECTED_RESIDENT" })
    }, [dispatch])

    const residents = useSelector((state) => state.residents.residents)
    const selectedResident = useSelector((state) => state.residents.selectedResident)
    const residentPayments = useSelector((state) => state.residents.residentPayments)

    useEffect(() => {
        // Convert the search input to a number (if it's a valid number)
        const searchValue = parseFloat(searchInput)
        
        // Filter residents based on search input
        const filtered = residents.filter((resident) => {
            const nameMatch = resident.name.toLowerCase().includes(searchInput.toLowerCase())
            const phoneNumberMatch = resident.phoneNumber.toString().includes(searchValue)
            return nameMatch || phoneNumberMatch
        })
        setFilteredResidents(filtered)
    }, [searchInput, residents])

    const handleShowResident = (residentId) => {
        dispatch(startGetSingleResident(pgDetailsId, residentId))
        dispatch(startGetResidentPayments(pgDetailsId, residentId)) // Fetch payment details
        setShowModal(true)
      }
      

    const closeModal = () => {
        setShowModal(false)
    }

    const handleRemoveResident = (residentId) => {
        const confirmation = window.confirm("Are you sure?")
        if (confirmation) {
            dispatch(startRemoveResident(pgDetailsId, residentId))
        }
    }

    const handleEditResident = (residentId) => {
        // Navigate to the EditResident component with the resident's id as a parameter
        history.push(`/editresident/${pgDetailsId}/${residentId}`)
    }

    return (
        <div>
            {role === "pg_admin" && (
                <div>
                    <h3 className="mb-3 text-center" style={{ color: '#EE6C13' }}>Residents Details</h3>
                    <div className="mb-3">
                        <Input
                            type="text"
                            placeholder="Search by name or mobile number"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                    <h4 className="mb-3 text-center" style={{ color: '#298384' }}>Total Residents - {residents.length} </h4>
                    <div className="card mb-3">
                    <div className="card-body" style={{ overflowY: "scroll", maxHeight: "400px" }}>
                        {filteredResidents.map((resident) => (
                        <div key={resident._id} className="card mb-2">
                            <div className="row">
                            <div className="col-md-3">
                                <img
                                src={resident.profileImage}
                                alt="Profile"
                                className="card-img"
                                width="100px"
                                height="100px"
                                />
                            </div>
                            <div className="col-md-9">
                                <h5 className="card-title"> <i style={{ color: "#D13570" }}>  {resident.name} </i></h5>
                                <p className="card-text" style={{ display: "flex", alignItems: "center" }}>
                                <div className="icon-button" style={{ marginRight: "10px" }}>
                                    <FaEye onClick={() => handleShowResident(resident._id)} style={{ color: "blue" }} />
                                </div>
                                <div className="icon-button" style={{ marginRight: "10px" }}>
                                    <FaEdit onClick={() => handleEditResident(resident._id)} style={{ color: "green" }} />
                                </div>
                                <div className="icon-button">
                                    <FaTrash onClick={() => handleRemoveResident(resident._id)} style={{ color: "red" }} />
                                </div>
                                </p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            )}
            <Modal isOpen={showModal} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>Resident Details</ModalHeader>
                <ModalBody>
                    {selectedResident && (
                        <table className="table">
                        <tbody>
                            <tr>
                                <td><strong>Name :</strong></td>
                                <td>{selectedResident.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Profile Image :</strong></td>
                                <td>
                                    {selectedResident.profileImage && (
                                    <img
                                        src={selectedResident.profileImage}
                                        width="200"
                                        height="200"
                                        alt="Aadhar"
                                    />
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Email :</strong></td>
                                <td>{selectedResident.email}</td>
                            </tr>
                            <tr>
                                <td><strong>PhoneNumber :</strong></td>
                                <td>{selectedResident.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td><strong>Date Of Joining :</strong></td>
                                <td>
                                    {selectedResident.dateOfJoining &&
                                    selectedResident.dateOfJoining.slice(0, 10)}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Guardian Name :</strong></td>
                                <td>{selectedResident.guardianName}</td>
                            </tr>
                            <tr>
                                <td><strong>Guardian Number :</strong></td>
                                <td>{selectedResident.guardianNumber}</td>
                            </tr>
                            <tr>
                                <td><strong>Address :</strong></td>
                                <td>{selectedResident.address}</td>
                            </tr>
                            <tr>
                                <td><strong>Room Details :</strong></td>
                                <td>
                                    <ul>
                                    <li>Sharing: {selectedResident.roomId && selectedResident.roomId.sharing}</li>
                                    <li>Room Number: {selectedResident.roomId && selectedResident.roomId.roomNumber}</li>
                                    <li>Floor: {selectedResident.roomId && selectedResident.roomId.floor}</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Aadhar Card :</strong></td>
                                <td>
                                    {selectedResident.aadharCard && (
                                    <img
                                        src={selectedResident.aadharCard}
                                        width="200"
                                        height="200"
                                        alt="Aadhar"
                                    />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    )}
                    <h4>Payment Details</h4>
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {residentPayments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.paymentDate.slice(0, 10)}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.status}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>                 
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={closeModal}>
                    Close
                </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ResidentsDetails




