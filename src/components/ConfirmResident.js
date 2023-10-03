import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft } from 'react-icons/fa'
function ConfirmResident(props) {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const userParam = searchParams.get('user')
    const residentParam = searchParams.get('resident')
    const [confirmationStatus, setConfirmationStatus] = useState('')

    const handleConfirmAccount = async () => {
      try{
        // Make an API call to update isAccountLinked and assign the userId to the userId field in residentsmodel
        await axios.put(`http://localhost:3800/api/residents/confirmResident/${residentParam}?user=${userParam}`)
        setConfirmationStatus('Account confirmed successfully.')
      } catch (error) {
        setConfirmationStatus('An error occurred while confirming the account.')
      }
    }

    const handleBackToHome = () => {
      window.location.href = '/' // Redirect to your success or home page
    }

    return (
      <div className="text-center">
        <div style={{
          border: '1px solid',
          padding: '20px',
          borderRadius: '5px',
          maxWidth: '400px',
          margin: '0 auto',
          marginTop: '20px'
        }}>
          <h4>Resident Account Confirmation</h4>
          <p 
            style={{color:'red',
            textAlign: 'center',
            marginTop: '10px'
            }}>{confirmationStatus}
          </p>
          <br/>
          <button 
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: '#5CBDB6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }} onClick={handleConfirmAccount}>Confirm Account</button>
          <button 
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: '#64B2E4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onClick={handleBackToHome}>
            <FaArrowLeft style={{ marginRight: '5px' }}/> Go to Home
          </button>
        </div>
      </div>
    )
}

export default ConfirmResident
