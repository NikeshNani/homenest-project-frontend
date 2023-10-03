import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { startGetVacatedResidents } from "../actions/residentsActions"
import { FaArrowLeft, FaEye } from "react-icons/fa"
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap"

const VacatedResidents = (props) => {
  const [selectedResident, setSelectedResident] = useState(null)
  const [isFetched, setIsFetched] = useState(false)
  const [showOffCanvas, setShowOffCanvas] = useState(false)
  const { pgDetailsId } = useParams()
  const history = useHistory()
  const vacatedResidents = useSelector((state) => state.residents.vacatedResidents)

  const dispatch = useDispatch()

  const handleVacatedResidents = async () => {
    try {
      await dispatch(startGetVacatedResidents(pgDetailsId))
      setIsFetched(true)
    } catch (error) {
      console.error("Error fetching vacated residents:", error)
    }
  }

  const handleShowDetails = (resident) => {
    setSelectedResident(resident)
    setShowOffCanvas(true)
  }

  const handleGotoDashboard = () => {
    history.push(`/admindashboard/${pgDetailsId}`)
  }

  return (
    <div>
      <div style={{ alignSelf: "flex-start", marginTop: "5px" }}>
        <button onClick={handleGotoDashboard} style={{
          margin: '5px',
          padding: '10px',
          backgroundColor: '#64B2E4',
          color: 'white',
          border: 'none',
          borderRadius: '8px'
        }}>
          <FaArrowLeft /> Go back to dashboard
        </button>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h3 style={{ color: "#7D50C2" }}>Vacated Residents</h3>
          {!isFetched && (
            <button style={{
                margin: '5px',
                padding: '10px',
                backgroundColor: '#F46C28',
                color: 'white',
                border: 'none',
                borderRadius: '8px'
              }} onClick={handleVacatedResidents}>
              Get Vacated Residents
            </button>
          )}
          {isFetched && vacatedResidents && vacatedResidents.length > 0 ? (
            <div className="card" style={{ width: "300px" }}>
              <div className="card-body">
                <h5 className="card-title">Vacated Residents List - {vacatedResidents.length}</h5>
                <ul>
                  {vacatedResidents.map((ele) => (
                    <li key={ele._id}>
                      {ele.name}{" "}
                      <FaEye onClick={() => handleShowDetails(ele)} style={{ color: "blue" }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : isFetched ? (
            <p className="alert alert-info">{vacatedResidents.message || "No vacated residents found"}</p>
          ) : null}
        </div>
        <Offcanvas isOpen={showOffCanvas} toggle={() => setShowOffCanvas(!showOffCanvas)}>
          <OffcanvasHeader toggle={() => setShowOffCanvas(!showOffCanvas)}>
            Vacated Resident Details
          </OffcanvasHeader>
          <OffcanvasBody>
            {selectedResident && (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{selectedResident.name}</td>
                    </tr>
                    <tr>
                    <td>Profile Image:</td>
                        <td>  
                            <img
                                src={selectedResident.profileImage}
                                width="200"
                                height="200"
                                alt="profile"
                            />
                        </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{selectedResident.email}</td>
                    </tr>
                    <tr>
                      <td>PhoneNumber</td>
                      <td>{selectedResident.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td>Guardian Name</td>
                      <td>{selectedResident.guardianName}</td>
                    </tr>
                    <tr>
                      <td>Guardian Number</td>
                      <td>{selectedResident.guardianNumber}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{selectedResident.address}</td>
                    </tr>
                    <tr>
                    <td>Aadhar Card:</td>
                    <td>  
                        <img
                            src={selectedResident.aadharCard}
                            width="200"
                            height="200"
                            alt="Aadhar"
                        />
                    </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </div>
  )
}

export default VacatedResidents
