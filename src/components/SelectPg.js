import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { startDestroyPg } from '../actions/pgDetailsActions'
import { FaEdit, FaTrash } from 'react-icons/fa'

const SelectPg = (props) => {
    const pgDetails = useSelector((state) => state.pgDetails.pgDetails)
    const [selectedPg, setSelectedPg] = useState('')
    const history = useHistory()

    const handleSelectPg = (pgId) => {
        setSelectedPg(pgId)
    }

    const handleNext = () => {
        if (selectedPg) {
            // Redirect to the AddRoom component with the selected PG's ID
            history.push(`/admindashboard/${selectedPg}`)
        }
    }

    const handleEdit = (pgDetailsId) => {
        // Redirect to the EditPG component with the selected PG's ID
        history.push(`/edit-pg/${pgDetailsId}`)
    }

    const dispatch = useDispatch()

    const handleRemove = (pgDetailsId) => {
        const confirmation = window.confirm('Are You Sure?')
        if (confirmation) {
            dispatch(startDestroyPg(pgDetailsId))
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="text-center">Select PG</h2>
                    <div className="text-center">
                        {pgDetails.map((pg) => (
                            <div key={pg._id} className="card mb-3">
                                <div className="card-body">
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            id={`pg_${pg._id}`}
                                            name="selectedPg"
                                            value={pg._id}
                                            className="custom-control-input"
                                            checked={selectedPg === pg._id}
                                            onChange={() => handleSelectPg(pg._id)}
                                        />
                                        <label className="custom-control-label" style={{marginLeft:"10px"}} htmlFor={`pg_${pg._id}`}>
                                            {pg.name}
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <div className="icon-button" style={{ marginRight: "10px" }}>
                                            <FaEdit onClick={() => handleEdit(pg._id)} style={{ color: "blue" }} /><span>Edit</span>
                                        </div>
                                        <div className="icon-button">
                                            <FaTrash onClick={() => handleRemove(pg._id)} style={{ color: "red" }} /><span>Remove</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-primary" style={{ marginTop: '10px' }} onClick={handleNext} disabled={!selectedPg}> Next </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectPg
