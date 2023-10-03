import React, { useEffect, useState, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { startCreateResident, startEditResident, startGetResidents } from '../actions/residentsActions'
import AccountConfirmationLink from './AccountConfirmationLink'
import axios from 'axios'
import validator from 'validator'
import { RoleContext } from './NavBar'

const AddResident = (props) => {
    const { role } = useContext(RoleContext)
    const { initialValues, isEditing, onEditSuccess, editResidentId } = props
    const [name, setName] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [guardianName, setGuardianName] = useState('')
    const [guardianNumber, setGuardianNumber] = useState('')
    const [address, setAddress] = useState('')
    const [aadharCard, setAadharCard] = useState(null)
    const [roomId, setRoomId] = useState('')
    const [availableRooms, setAvailableRooms] = useState([])

    const profileImageInputRef = useRef(null)
    const aadharCardInputRef = useRef(null)

    const { pgDetailsId } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetResidents(pgDetailsId))
    }, [dispatch, pgDetailsId])

    const [formErrors, setFormErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        switch (name) {
        case 'name':
            setName(value)
            break
        case 'phoneNumber':
            setPhoneNumber(value)
            break
        case 'email':
            setEmail(value)
            break
        case 'guardianName':
            setGuardianName(value)
            break
        case 'guardianNumber':
            setGuardianNumber(value)
            break
        case 'address':
            setAddress(value)
            break
        case 'roomId':
            setRoomId(value)
            break
        default:
            break
        }
    }

    const handleFileInputChange = (e) => {
        const { name, files } = e.target
        switch (name) {
        case 'profileImage':
            setProfileImage(files[0])
            break
        case 'aadharCard':
            setAadharCard(files[0])
            break
        default:
            break
        }
    }

    useEffect(() => {
        axios
        .get(`http://localhost:3800/api/rooms/availableRooms?pgDetailsId=${pgDetailsId}`, {
            headers: {
            'x-auth': localStorage.getItem('token'),
            },
        })
        .then((res) => {
            setAvailableRooms(res.data)
        })
        .catch((error) => {
            console.log('Error', error)
        })
    }, [pgDetailsId])

    const residents = useSelector((state) => state.residents.residents)

    const residentId = residents.length > 0 ? residents[residents.length - 1]._id : null

    const isEditingMode = isEditing || false

    const history = useHistory() // Get the history object
    const handleCancel = () => {
        // Redirect to the admin dashboard when the "Cancel" button is clicked
        history.push(`/admindashboard/${pgDetailsId}`)
    }   

    useEffect(() => {
        if (isEditingMode && initialValues) {
        const { name, phoneNumber, email, guardianName, guardianNumber, address, profileImage, aadharCard, roomId } = initialValues

        if (profileImage) {
            setProfileImage(profileImage)
        }

        if (aadharCard) {
            setAadharCard(aadharCard)
        }

        setName(name || '')
        setPhoneNumber(phoneNumber || '')
        setEmail(email || '')
        setGuardianName(guardianName || '')
        setGuardianNumber(guardianNumber || '')
        setAddress(address || '')
        setRoomId(roomId._id || '')
        }
    }, [isEditingMode, initialValues])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = {}
        if(!isEditingMode){
            if (!name) {
                errors.name = 'This field is required'
            } else if (!validator.isLength(name, { min: 2, max: 28 })) {
                errors.name = 'Invalid Name'
            }
        
            if (!email) {
                errors.email = 'This field is required'
            } else if (!validator.isEmail(email)) {
                errors.email = 'Invalid Email'
            }
        
            if (!phoneNumber) {
                errors.phoneNumber = 'This field is required'
            } else if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
                errors.phoneNumber = 'Invalid Phone Number'
            }
        
            if (!guardianName) {
                errors.guardianName = 'This field is required'
            } else if (!validator.isLength(guardianName, { min: 2, max: 255 })) {
                errors.guardianName = 'Invalid Guardian Name'
            }
        
            if (!guardianNumber) {
                errors.guardianNumber = 'This field is required'
            } else if (!validator.isMobilePhone(guardianNumber, 'any', { strictMode: false })) {
                errors.guardianNumber = 'Invalid Guardian Number'
            }
        
            if (!address) {
                errors.address = 'This field is required'
            } else if (!validator.isLength(address, { min: 2, max: 255 })) {
                errors.address = 'Invalid Address'
            }
        
            if (!roomId) {
                errors.roomId = 'Please select a room'
            }
        
                // Validating profileImage
            if (!profileImage) {
                errors.profileImage = 'This field is required'
            } else if (!['image/jpeg', 'image/png', 'image.jpg'].includes(profileImage.type)) {
                errors.profileImage = 'Invalid Image Format (JPEG or PNG or JPG only)'
            } else if (profileImage.size > 1024 * 1024) {
                errors.profileImage = 'Image size should be less than 1MB'
            }
        
                // Validating aadharCard
            if (!aadharCard) {
                errors.aadharCard = 'This field is required'
            } else if (!['image/jpeg', 'image/png'].includes(aadharCard.type)) {
                errors.aadharCard = 'Invalid Image Format (JPEG or PNG only)'
            } else if (aadharCard.size > 1024 * 1024) {
                errors.aadharCard = 'Image size should be less than 1MB'
            }
        }

        if (Object.keys(errors).length > 0) {
        setFormErrors(errors)
        return
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('phoneNumber', phoneNumber)
        formData.append('email', email)
        formData.append('guardianName', guardianName)
        formData.append('guardianNumber', guardianNumber)
        formData.append('address', address)
        formData.append('profileImage', profileImage)
        formData.append('aadharCard', aadharCard)
        formData.append('roomId', roomId)

        const reset = () => {
        setName('')
        setAddress('')
        setEmail('')
        setGuardianName('')
        setGuardianNumber('')
        setPhoneNumber('')
        setRoomId('')
        profileImageInputRef.current.value = ''
        aadharCardInputRef.current.value = ''
        }
        if (isEditingMode) {
        await dispatch(startEditResident(formData, pgDetailsId, editResidentId, reset))
        onEditSuccess()
        } else {
        await dispatch(startCreateResident(formData, pgDetailsId, reset))
        }

        const response = await axios.get(`http://localhost:3800/api/rooms/availableRooms?pgDetailsId=${pgDetailsId}`, {
        headers: {
            'x-auth': localStorage.getItem('token'),
        },
        })

        try {
        setAvailableRooms(response.data)
        } catch (e) {
        console.log(e.message)
        }
    }

    return (
        <div className="container text-center">
            <div className="card" style={{
                    border: '1px solid',
                    padding: '20px',
                    borderRadius: '5px',
                    maxWidth: '400px',
                    margin: '0 auto',
                    marginTop: '20px'
                }}>
                {role === 'pg_admin' && (
                <div className="card-body">
                    <h2 style={{color : '#D541E3'}}>{isEditingMode ? 'Edit Resident' : 'Add Resident'}</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label">
                        Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" className="form-control" name="name" value={name} onChange={handleInputChange} />
                        {formErrors.name && <p className="text-danger">{formErrors.name}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Profile Image <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="file"
                            className="form-control"
                            ref={profileImageInputRef}
                            name="profileImage"
                            onChange={handleFileInputChange}
                        />
                        {formErrors.profileImage && <p className="text-danger">{formErrors.profileImage}</p>}
                        {isEditing && profileImage && (
                        <img src={profileImage} alt="Profile" width="100" height="100" />
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Phone Number <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" className="form-control" name="phoneNumber" value={phoneNumber} onChange={handleInputChange} />
                        {formErrors.phoneNumber && <p className="text-danger">{formErrors.phoneNumber}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Email <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" className="form-control" name="email" value={email} onChange={handleInputChange} />
                        {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Guardian Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" className="form-control" name="guardianName" value={guardianName} onChange={handleInputChange} />
                        {formErrors.guardianName && <p className="text-danger">{formErrors.guardianName}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Guardian Number <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        name="guardianNumber"
                        value={guardianNumber}
                        onChange={handleInputChange}
                        />
                        {formErrors.guardianNumber && <p className="text-danger">{formErrors.guardianNumber}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Address <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" className="form-control" name="address" value={address} onChange={handleInputChange} />
                        {formErrors.address && <p className="text-danger">{formErrors.address}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Aadhar Card <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                        type="file"
                        className="form-control"
                        ref={aadharCardInputRef}
                        name="aadharCard"
                        onChange={handleFileInputChange}
                        />
                        {formErrors.aadharCard && <p className="text-danger">{formErrors.aadharCard}</p>}
                        {isEditingMode && aadharCard && (
                        <img src={aadharCard} alt="Aadhar" width="100" height="100" />
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                        Select Room: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select className="form-select" name="roomId" value={roomId} onChange={handleInputChange}>
                        <option value="">Select a room</option>
                        {availableRooms.map((room) => (
                            <option key={room._id} value={room._id}>
                            {`Room ${room.roomNumber} - Sharing: ${room.sharing} - Floor: ${room.floor}`}
                            </option>
                        ))}
                        </select>
                        {formErrors.roomId && <p className="text-danger">{formErrors.roomId}</p>}
                    </div>
                    <button type="submit" 
                    style={{
                        margin: '5px',
                        padding: '10px',
                        backgroundColor: '#5CBDB6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px'
                    }}>
                        {isEditingMode ? 'Edit Resident' : 'Add Resident'}
                    </button>
                    {!isEditingMode &&  <p style={{color : 'red'}}> Note : Please send the confirmation email after adding the resident immediately</p>}
                    {isEditingMode && (
                        <button
                            onClick={handleCancel}
                            style={{
                            margin: '5px',
                            padding: '10px',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px'
                            }}>
                            Cancel
                        </button>
                        )}
                    </form>
                    {isEditingMode ? null : <AccountConfirmationLink residentId={residentId} />}
                </div>
                )}
            </div>
        </div>
    )
}

export default AddResident
