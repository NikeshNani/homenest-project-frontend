import axios from "axios"
import Swal from "sweetalert2"

export const startCreateResident = (formData, pgDetailsId, reset) => {
    console.log(pgDetailsId)
    return async (dispatch) => {
        try{
            const response = await axios.post(`http://localhost:3800/api/residents/addResident/${pgDetailsId}`, formData , {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('resident-res', response.data)
            dispatch(addResident(response.data))
            reset()
            Swal.fire({
                icon : 'success',
                title : 'Resident added successfully'
            })
        }catch(e){
            alert(e.message)
        }
    }
}

export const addResident = (data) => {
    return{
        type : "ADD_RESIDENT",
        payload : data
    }
}

export const startGetResidents = (pgDetailsId) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/residents/getResidents/${pgDetailsId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-residents-data',response.data)
            dispatch(getResidents(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getResidents = (data) => {
    return{
        type: "GET_RESIDENTS",  //action creator name
        payload: data   // action creator's payload
    }
}


export const startGetSingleResident = (pgDetailsId,residentId) => {
    return async (dispatch)=>{
        try{
            const response = await axios.get(`http://localhost:3800/api/residents/pg/${pgDetailsId}/resident/${residentId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('single-resident-show', response.data)
            dispatch(getSingleResident(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getSingleResident = (data) => {
    return{
        type : "SINGLE_RESIDENT",
        payload : data
    }
}

export const startRemoveResident = (pgDetailsId,residentId) => {
    return async (dispatch)=> {
        try{
            const response = await axios.delete(`http://localhost:3800/api/residents/destroyResident/${residentId}?pgDetailsId=${pgDetailsId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('remove-resident-res', response.data)
            dispatch(removeResident(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const removeResident = (data) => {
    return{
        type:"REMOVE_RESIDENT" ,payload:data
    }
}


export const startEditResident = (formData, pgDetailsId, residentId, reset) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(
                `http://localhost:3800/api/residents/updateResident/${residentId}?pgDetailsId=${pgDetailsId}`,
                formData,
                {
                    headers: {
                        'x-auth': localStorage.getItem('token'),
                    },
                }
            )
            console.log('edit-resident-res', response.data)
            dispatch(editResident(response.data))
            reset()
            Swal.fire({
                icon : 'success',
                title : 'Resident updated successfully'
            })
        } catch (e) {
            alert(e.message)
        }
    }
}

export const editResident = (data) => {
    return {
        type: 'EDIT_RESIDENT',
        payload: data,
    }
}

export const startGetVacatedResidents = (pgDetailsId) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/residents/admin/softDeletedResidents?pgDetailsId=${pgDetailsId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('vacated-residents', response.data)
            dispatch(getVacatedResidents(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getVacatedResidents = (data) => {
    return {
        type:'GET_VACATED_RESIDENTS',
        payload:data
    }
}

export const startGetResidentPayments = (pgDetailsId, residentId) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3800/api/payments/getResidentPayments/${pgDetailsId}/${residentId}`, {
          headers: {
            'x-auth': localStorage.getItem('token')
          }
        })
        console.log('resident-payments', response.data)
        dispatch(getResidentPayments(response.data))
      } catch (error) {
        alert(error.message)
      }
    }
  }
  
  export const getResidentPayments = (data) => {
    return {
      type: 'GET_RESIDENT_PAYMENTS',
      payload: data
    }
  }
  
