import React from 'react'
import { useHistory } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AddResident from './AddResidentForm'

const EditResident = () => {
    const { pgDetailsId, residentId } = useParams()
    
    const history = useHistory() // Get the history object

    const residents = useSelector((state) => state.residents.residents)
    const residentData = residents.find((resident) => resident._id === residentId)

    const handleEditSuccess = () => {
        // Redirect to the admin dashboard when the resident is successfully edited i.e when he clicks on edit resident button 
        history.push(`/admindashboard/${pgDetailsId}`)
    }

    return (
        <div>
            {residentData && (
                <div>
                    <AddResident
                        isEditing={true}
                        initialValues={residentData}
                        editResidentId = {residentId}
                        onEditSuccess={handleEditSuccess}
                    />
                </div>
            )}
        </div>
    )
}

export default EditResident
