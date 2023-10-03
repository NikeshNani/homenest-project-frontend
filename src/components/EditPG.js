import React, { useState, useRef } from "react"
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { startEditPg } from '../actions/pgDetailsActions'
const EditPG = () => {
    const { pgDetailsId } = useParams()
    const pgDetails = useSelector((state) => state.pgDetails.pgDetails)
    const selectedPG = pgDetails.find((pg) => pg._id === pgDetailsId)

    const [name, setName] = useState(selectedPG ? selectedPG.name : "")
    const [address, setAddress] = useState(selectedPG ? selectedPG.address : "")
    const [contact, setContact] = useState(selectedPG ? selectedPG.contact : "")
    const [rooms, setRooms] = useState(selectedPG ? selectedPG.totalRooms : "")
    const [pricing, setPricing] = useState(
        selectedPG ? selectedPG.pricing : [{ share: "", amount: "" }]
    )
    const [facilities, setFacilities] = useState(
        selectedPG ? selectedPG.facilities : []
    )
    const [pgType, setPgType] = useState(selectedPG ? selectedPG.pgType : "")
    const [foodType, setFoodType] = useState(
        selectedPG ? selectedPG.foodType : ""
    )
    const [nearByPlaces, setNearByPlaces] = useState(
        selectedPG ? selectedPG.nearByPlaces : [{ name: "", distance: "" }]
    )
    const [images, setImages] = useState(selectedPG ? selectedPG.images : [])

    const fileInputRef = useRef(null)

    const facilitiesOptions = [
        { value: "wifi", label: "Wi-Fi" },
        { value: "washing_machine", label: "Washing Machine" },
        { value: "geyser", label: "Geyser" }
    ]

    const handleFacilitiesChange = (selectedOptions) => {
        setFacilities(selectedOptions.map((option) => option.value))
    }

    const handleFileChange = (e) => {
        console.log(e.target.files)
        setImages([...images, ...Array.from(e.target.files)])
    }
    
    const addPricingField = () => {
        setPricing([...pricing, { share: "", amount: "" }])
    }

    const removePricingField = (index) => {
        const updatedPricing = [...pricing]
        updatedPricing.splice(index, 1)
        setPricing(updatedPricing)
    }

    const handlePricingChange = (index, field, value) => {
        const updatedPricing = [...pricing]
        updatedPricing[index][field] = value
        setPricing(updatedPricing)
    }

    const addNearByPlacesField = () => {
        setNearByPlaces([...nearByPlaces, { name: "", distance: "" }])
    }

    const removeNearByPlacesField = (index) => {
        const updatedNearByPlaces = [...nearByPlaces]
        updatedNearByPlaces.splice(index, 1)
        setNearByPlaces(updatedNearByPlaces)
    }

    const handleNearByPlacesChange = (index, field, value) => {
        const updatednearByPlaces = [...nearByPlaces]
        updatednearByPlaces[index][field] = value
        setNearByPlaces(updatednearByPlaces)
    }

    const removeImage = (index) => {
        const updatedImages = [...images]
        updatedImages.splice(index, 1)
        setImages(updatedImages)
    }

    const dispatch = useDispatch()    
    const history = useHistory()
    const reset = () => {
        setName("")
        setAddress("")
        setContact("")
        setRooms("")
        setPricing([{ share: "", amount: "" }])
        setFacilities([])
        setPgType("")
        setFoodType("")
        setNearByPlaces([{ name: "", distance: "" }])
        setImages([])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
        name,
        address,
        contact,
        totalRooms: rooms,
        pgType,
        foodType,
        pricing,
        facilities,
        nearByPlaces,
        images
        }
        dispatch(startEditPg(pgDetailsId, formData, reset))
        history.push('/selectpg')
    }

    return (
        <div className="container text-center" style={{marginTop : '10px'}}>
            <div className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
                <div className="card-header text-center">
                    <button onClick={() => history.push('/selectpg')} className="btn btn-secondary float-end">Close</button>
                </div>
                <div className="card-body">
                    <h2 className="text-center mb-4">Edit PG</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <label className="form-label">Enter PG Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Pg name"
                                name="name"
                                value={name}
                                onChange={(e) => {setName(e.target.value) }}
                            />
                        
                            <label className="form-label">Enter PG Address</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Address"
                                name="address"
                                value={address}
                                onChange={(e) => { setAddress(e.target.value) }}
                            />
                        
                            <label className="form-label">Contact:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        
                            <label className="form-label">Total Rooms:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={rooms}
                                onChange={(e) => setRooms(e.target.value)}
                            />
                        
                            <label className="form-label">Pricing:</label>
                            {pricing.map((price, index) => (
                                <div key={index} className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Share"
                                        value={price.share}
                                        onChange={(e) => handlePricingChange(index, "share", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Amount"
                                        value={price.amount}
                                        onChange={(e) => handlePricingChange(index, "amount", e.target.value)}
                                    /> <br />
                                    <button type="button" onClick={() => removePricingField(index)} style={{
                                        margin: '5px',
                                        padding: '10px',
                                        backgroundColor: '#DE485D',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px'
                                    }}>Remove Pricing</button>
                                </div>
                            ))}
                            <button type="button" onClick={addPricingField} style={{
                                margin: '5px',
                                padding: '10px',
                                backgroundColor: '#14727B',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px'
                            }}>Add Pricing</button>
                            <br />
                            <label className="form-label">Facilities:</label>
                            <Select
                                isMulti
                                options={facilitiesOptions}
                                value={facilitiesOptions.filter((option) =>
                                    facilities.includes(option.value)
                                )}
                                onChange={handleFacilitiesChange}
                            />
                            <label className="form-label">PG Type:</label>
                            <select className="form-select" value={pgType} onChange={(e) => setPgType(e.target.value)}>
                                <option value=''>Select pg type</option>
                                <option value='Boys'>Boys</option>
                                <option value='Girls'>Girls</option>
                                <option value='Co-Living'>Co-Living</option>
                            </select>
                        
                            <label className="form-label">Food Type:</label>
                            <select className="form-select" value={foodType} onChange={(e) => setFoodType(e.target.value)}>
                                <option value=''>Select food type</option>
                                <option value='Veg'>Veg</option>
                                <option value='Veg&Non-Veg'>Veg&Non-Veg</option>
                            </select>
                            <label className="form-label">Nearby Places:</label>
                            {nearByPlaces.map((nearByPlace, index) => (
                                <div key={index} className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={nearByPlace.name}
                                        onChange={(e) => handleNearByPlacesChange(index, "name", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Distance"
                                        value={nearByPlace.distance}
                                        onChange={(e) => handleNearByPlacesChange(index, "distance", e.target.value)}
                                    />
                                    <br />
                                    <button type="button" onClick={() => removeNearByPlacesField(index)} style={{
                                        margin: '5px',
                                        padding: '10px',
                                        backgroundColor: '#DE485D',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px'
                                    }}>Remove Place</button>
                                </div>
                            ))}
                            <button type="button" onClick={addNearByPlacesField} style={{
                                margin: '5px',
                                padding: '10px',
                                backgroundColor: '#14727B',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px'
                            }}>Add Nearby Place</button>
                            <br />
                            <label className="form-label" style={{marginTop : '10px'}}>Images:</label>
                            <input
                                type="file"
                                multiple
                                name="images"
                                className="form-control"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            /> <br />
                            <label className="form-label">Prefilled Images:</label>
                            {images.map((image, index) => (
                                <div key={index} className="mb-3">
                                    <img src={image} alt="img" style={{ width: '100px', height: '100px' }} />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        style={{
                                            margin: '5px',
                                            padding: '10px',
                                            backgroundColor: '#DE485D',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            ))}
                            <button type="submit" style={{
                                margin: '5px',
                                padding: '10px',
                                backgroundColor: '#5CBDB6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px'
                            }}>Edit PG</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPG
