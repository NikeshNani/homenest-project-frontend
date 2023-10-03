import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { startShowPG } from "../actions/pgDetailsActions"
import searchPg from '../images/searchPg.jpg'

const PGList = (props) => {
    const allPGs = useSelector((state) => state.pgDetails.allPgs)
    console.log('allPgs', allPGs)

    const dispatch = useDispatch()
    const history = useHistory()

    // State to store the search query
    const [searchQuery, setSearchQuery] = useState('')

    const handleShowPG = (pgDetailsId) => {
        console.log('pgId', pgDetailsId)
        dispatch(startShowPG(pgDetailsId))
        history.push(`/showPg/${pgDetailsId}`) // Navigate to ShowPG
    }

    return (
        <div className="container" style={{ marginTop: '10px' }}>
            <div className="row">
                <div className="col-md-6">
                    <img src={searchPg} alt="searchPg" className="img-fluid" />
                    <p className="mt-3">
                        Are you looking for a PG? Don't worry! We can help you find eco-friendly and budget-friendly accommodation near your workplace.
                    </p>
                    <p>
                        Our platform offers a wide selection of PG accommodations with various features and pricing options. Whether you're a student, a working professional, or just someone in need of a comfortable place to stay, you'll find something that suits your needs.
                    </p>
                    <p>
                        Use the search bar to find PGs by name or location, and discover details such as the number of available rooms, monthly rent, and any special features provided. Once you've found a PG that interests you, simply click "Show" to get more information.
                    </p>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center"
                                style={{
                                    color: '#97245A',
                                    transition: '0.3s',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // text shadow
                                    fontStyle: 'italic',
                                }}>List of PGs</h1> <br />
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search by name or address"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <ul className="list-group">
                                {allPGs.map((pg, index) => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={pg._id}>
                                        <div className="pg-info">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={pg.images[0]}
                                                    alt={`PGImage ${index + 1}`}
                                                    className="pg-image"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        marginRight: '10px' // some margin between image and name
                                                    }}
                                                />
                                                <div>
                                                    <h5 style={{ textTransform: 'uppercase' }}>{pg.name}</h5>
                                                    <button style={{
                                                        margin: '5px',
                                                        padding: '10px',
                                                        backgroundColor: '#B17DCB',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '8px'
                                                    }} onClick={() => handleShowPG(pg._id)}>Show</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PGList