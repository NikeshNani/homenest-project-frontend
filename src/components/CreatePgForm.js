import React, { useState, useContext, useRef } from "react"
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { startCreatePG } from '../actions/pgDetailsActions'
import validator from 'validator'
import { RoleContext } from "./NavBar"

const AddPG = (props) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [rooms, setRooms] = useState('')
    const [pricing, setPricing] = useState([{ share: "", amount: "" }])
    const [facilities, setFacilities] = useState([])
    const [pgType, setPgType] = useState('')
    const [foodType, setFoodType] = useState('')
    const [nearByPlaces, setNearByPlaces] = useState([{ name: "", distance: "" }])
    const [images, setImages] = useState([])

    const fileInputRef = useRef(null)
    const { role } = useContext(RoleContext)

    const [formErrors, setFormErrors] = useState({})

    const facilitiesOptions = [
        { value: "wifi", label: "Wi-Fi" },
        { value: "washing_machine", label: "Washing Machine" },
        { value: "geyser", label: "Geyser" },
    ]

    const handleFacilitiesChange = (selectedOptions) => {
        setFacilities(selectedOptions.map((option) => option.value))
    }

    const handleFileChange = (e) => {
        setImages(e.target.files)
    }

    const addPricingField = () => {
        setPricing([...pricing, { share: "", amount: "" }])
    }

    const removePricingField = (index) => {
        const updatedpricing = [...pricing]
        updatedpricing.splice(index, 1)
        setPricing(updatedpricing)
    }

    const handlePricingChange = (index, field, value) => {
        const updatedpricing = [...pricing]
        updatedpricing[index][field] = value
        setPricing(updatedpricing)
    }

    const addNearByPlacesField = () => {
        setNearByPlaces([...nearByPlaces, { name: "", distance: "" }])
    }

    const removeNearByPlacesField = (index) => {
        const updatednearByPlaces = [...nearByPlaces]
        updatednearByPlaces.splice(index, 1)
        setNearByPlaces(updatednearByPlaces)
    }

    const handleNearByPlacesChange = (index, field, value) => {
        const updatednearByPlaces = [...nearByPlaces]
        updatednearByPlaces[index][field] = value
        setNearByPlaces(updatednearByPlaces)
    }

    const dispatch = useDispatch()

    const validateForm = () => {
        const errors = {}

        if (!name) {
            errors.name = 'Name is required'
        }

        if (!address) {
            errors.address = 'Address is required'
        }

        if (!contact) {
            errors.contact = 'Contact is required'
        } else if (!validator.isMobilePhone(contact, 'any', { strictMode: false })) {
            errors.contact = 'Invalid Contact Number'
        }

        if (!rooms) {
            errors.rooms = 'Total Rooms is required'
        }

        if (!pgType) {
            errors.pgType = 'PG Type is required'
        }

        if (!foodType) {
            errors.foodType = 'Food Type is required'
        }

        if (facilities.length === 0) {
            errors.facilities = 'Facilities are required'
        }

        if (images.length === 0) {
            errors.images = 'Images are required'
        }

        pricing.forEach((price, index) => {
            if (!price.share) {
                errors[`pricing[${index}].share`] = 'Share is required'
            }
            if (!price.amount) {
                errors[`pricing[${index}].amount`] = 'Amount is required'
            }
        })

        nearByPlaces.forEach((place, index) => {
            if (!place.name) {
                errors[`nearByPlaces[${index}].name`] = 'Name is required'
            }
            if (!place.distance) {
                errors[`nearByPlaces[${index}].distance`] = 'Distance is required'
            }
        })

        setFormErrors(errors)

        return Object.keys(errors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('address', address)
            formData.append('contact', contact)
            formData.append('totalRooms', rooms)
            formData.append('pgType', pgType)
            formData.append('foodType', foodType)

            for (let i = 0 ; i < images.length ; i++) {
                formData.append('images', images[i])
            }

            facilities.forEach((facility) => {
                formData.append('facilities', facility)
            })

            pricing.forEach((price, index) => {
                formData.append(`pricing[${index}][share]`, price.share)
                formData.append(`pricing[${index}][amount]`, price.amount)
            })

            nearByPlaces.forEach((place, index) => {
                formData.append(`nearByPlaces[${index}][name]`, place.name)
                formData.append(`nearByPlaces[${index}][distance]`, place.distance)
            })

            const reset = () => {
                setName('')
                setAddress('')
                setContact('')
                setRooms('')
                setPricing([{ share: '', amount: '' }])
                setFacilities([])
                setPgType('')
                setFoodType('')
                setNearByPlaces([{ name: '', distance: '' }])
                setImages([])
                fileInputRef.current.value = ''
            }

            dispatch(startCreatePG(formData, reset))
        }
    }

    return (
        <div className="container text-center">
            {role === 'pg_admin' && (
                <div>
                    <div>
                        <div className="card" style={{
                            border: '1px solid',
                            padding: '20px',
                            borderRadius: '5px',
                            maxWidth: '400px',
                            margin: '0 auto',
                            marginTop: '20px'
                        }}>
                            <div className="card-body">
                                <h2 style={{color : '#D541E3'}}>Add PG</h2>
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                            <label className="form-label">Enter PG Name</label> <span style={{ color: 'red' }}>*</span> <br />
                                            <input
                                                type="text"
                                                placeholder="Enter PG name"
                                                name='name'
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => { setName(e.target.value) }}
                                            /> <br />
                                        
                                        {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
                                        <label  className="form-label">Enter PG Address</label> <span style={{ color: 'red' }}>*</span>  <br />
                                        <input
                                            type="text"
                                            placeholder="Enter address"
                                            name='address'
                                            className="form-control"
                                            value={address}
                                            onChange={(e) => { setAddress(e.target.value) }}
                                        /> <br />
                                        {formErrors.address && <p style={{ color: 'red' }}>{formErrors.address}</p>}
                                        <label  className="form-label">Contact </label> <span style={{ color: 'red' }}>*</span> <br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={contact}
                                            placeholder="Enter contact number"
                                            onChange={(e) => setContact(e.target.value)}
                                        /><br />
                                        {formErrors.contact && <p style={{ color: 'red' }}>{formErrors.contact}</p>}
                                        <label  className="form-label">Total Rooms </label> <span style={{ color: 'red' }}>*</span>  <br />
                                        <input
                                            type="number"
                                            placeholder="Enter total rooms"
                                            className="form-control"
                                            value={rooms}
                                            onChange={(e) => setRooms(e.target.value)}
                                        /><br />
                                        {formErrors.rooms && <p style={{ color: 'red' }}>{formErrors.rooms}</p>}
                                        <label  className="form-label">Pricing </label> <span style={{ color: 'red' }}>*</span>  <br />
                                        {pricing.map((pricing, index) => (
                                            <div key={index}>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter sharing"
                                                    value={pricing.share}
                                                    onChange={(e) => handlePricingChange(index, "share", e.target.value)}
                                                /> <br />
                                                {formErrors[`pricing[${index}].share`] && (
                                                    <p style={{ color: 'red' }}>{formErrors[`pricing[${index}].share`]}</p>
                                                )}
                                                <input
                                                    type="text"
                                                    placeholder="Enter amount"
                                                    className="form-control"
                                                    value={pricing.amount}
                                                    onChange={(e) => handlePricingChange(index, "amount", e.target.value)}
                                                /> <br />
                                                {formErrors[`pricing[${index}].amount`] && (
                                                    <p style={{ color: 'red' }}>{formErrors[`pricing[${index}].amount`]}</p>
                                                )}
                                                <button type="button" onClick={() => removePricingField(index)}>Remove</button> <br />
                                            </div>
                                        ))}
                                        <button type="button" style={{marginTop : '5px'}} onClick={addPricingField}>Add Pricing</button> <br />
                                        <label  className="form-label">Facilities </label> <span style={{ color: 'red' }}>*</span>  <br />
                                        <Select
                                            isMulti
                                            options={facilitiesOptions}
                                            placeholder = 'Select facilities'
                                            value={facilitiesOptions.filter((option) =>
                                                facilities.includes(option.value)
                                            )}
                                            onChange={handleFacilitiesChange}
                                        />
                                        <br />
                                        {formErrors.facilities && <p style={{ color: 'red' }}>{formErrors.facilities}</p>}
                                        <label  className="form-label">PG Type </label> <span style={{ color: 'red' }}>*</span>  <br />
                                        <select className="form-select" value={pgType} onChange={(e) => setPgType(e.target.value)}>
                                            <option value=''>Select pg type</option>
                                            <option value="Boys">Boys</option>
                                            <option value="Girls">Girls</option>
                                            <option value="Co-Living">Co-Living</option>
                                        </select> <br />
                                        {formErrors.pgType && <p style={{ color: 'red' }}>{formErrors.pgType}</p>}
                                        <label  className="form-label">Food Type </label> <span style={{ color: 'red' }}>*</span>  <br />
                                        <select className="form-select" value={foodType} onChange={(e) => setFoodType(e.target.value)}>
                                            <option value=''>Select food type</option>
                                            <option value="Veg">Veg</option>
                                            <option value="Veg&Non-Veg">Veg&Non-Veg</option>
                                        </select><br />
                                        {formErrors.foodType && <p style={{ color: 'red' }}>{formErrors.foodType}</p>}
                                        <label  className="form-label">Nearby Places </label> <span style={{ color: 'red' }}>*</span>  <br />
                                        {nearByPlaces.map((nearByPlace, index) => (
                                            <div key={index}>
                                                <input
                                                    type="text"
                                                    placeholder="Enter name"
                                                    className="form-control"
                                                    value={nearByPlace.name}
                                                    onChange={(e) => handleNearByPlacesChange(index, "name", e.target.value)}
                                                /> <br />
                                                {formErrors[`nearByPlaces[${index}].name`] && (
                                                    <p style={{ color: 'red' }}>{formErrors[`nearByPlaces[${index}].name`]}</p>
                                                )}
                                                <input
                                                    type="text"
                                                    placeholder="Enter distance"
                                                    className="form-control"
                                                    value={nearByPlace.distance}
                                                    onChange={(e) => handleNearByPlacesChange(index, "distance", e.target.value)}
                                                />
                                                {formErrors[`nearByPlaces[${index}].distance`] && (
                                                    <p style={{ color: 'red' }}>{formErrors[`nearByPlaces[${index}].distance`]}</p>
                                                )} <br />
                                                <button type="button" onClick={() => removeNearByPlacesField(index)}>Remove</button>
                                            </div>
                                        ))}
                                        <button type="button" style={{marginTop : '5px'}} onClick={addNearByPlacesField}>Add Nearby Place</button> <br />
                                        <label  className="form-label">Images </label> <span style={{ color: 'red' }}>*</span> <br />
                                        <input
                                            type="file"
                                            multiple
                                            className="form-control"
                                            name="images"
                                            accept=".png, .jpg, .jpeg"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        /><br />
                                        {formErrors.images && <p style={{ color: 'red' }}>{formErrors.images}</p>}
                                        <button type="submit" style={{
                                            margin: '5px',
                                            padding: '10px',
                                            backgroundColor: '#5CBDB6',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px'
                                        }}>Add PG</button>
                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddPG
