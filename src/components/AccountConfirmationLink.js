import React, { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useParams, useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const AccountConfirmationLink = (props) => {
    const [email, setEmail] = useState('')

    const { pgDetailsId } = useParams() // Get the pgDetailsId from the URL parameters
    console.log('pgDetailsId-confirmation', pgDetailsId)

    const history = useHistory()
    
    const {residentId} = props
    //console.log(residentId)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const accountConfirmation = await axios.post(`http://localhost:3800/api/residents/sendConfirmationLink/${residentId}?pgDetailsId=${pgDetailsId}` , {email : email }, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            //console.log(accountConfirmation.data)
            const  message  = accountConfirmation.data.message
            let icon = 'success'
            let title = 'Confirmation' 

            if (message.includes('Provide a valid email')) {
                icon = 'warning'
                title = 'Warning'
            }

            // Show SweetAlert2 popup with the appropriate icon
            Swal.fire({
                title: title,
                text: message,
                icon: icon,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
            setEmail('')
        }catch(e){
            // Show SweetAlert2 popup for error
            Swal.fire({
                title: 'Error',
                text: 'An error occurred.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
        }
    } 

    const handleGoToAdminDashboard = () => {
        history.push(`/admindashboard/${pgDetailsId}`)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h5>Send Confirmation Account Link</h5>
                <label>Enter Email</label><br/>
                <input type = "text" value = {email} name = 'email' onChange={(e) =>setEmail(e.target.value)} style={{ marginBottom: '10px' }}/> <br/>                
                <input type = "submit" value = 'Send Confirmation Link' style={{
                  margin: '5px',
                  padding: '10px',
                  backgroundColor: '#F46C28',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px'
                }} /> <br />
            </form><br/>
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
    )
}

export default AccountConfirmationLink