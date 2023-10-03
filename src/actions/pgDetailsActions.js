import axios from "axios"
import Swal from "sweetalert2"

export const startCreatePG = (formData, reset) => {
    return async(dispatch) => {
        try{
            const response = await axios.post('http://localhost:3800/api/pgdetails/createPg', formData, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('pg-response', response.data)
            dispatch(createPG(response.data))
            reset()
            Swal.fire({
                title:'PG successfully added',
                icon : 'success'
            })
        }catch(e){
            alert(e.message)
        }
    }
}

export const createPG = (data) => {
    return {
        type : "CREATE_PG",
        payload : data
    }
}

export const startGetAdminPgDetails = () => {
    return async(dispatch)=>{
        try{
            const response = await axios.get('http://localhost:3800/api/pgdetails/getPgsForAdmin', {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('response-pgs', response.data)
            // Check if the response is null and handle it appropriately
            if (response.data === null) {
                dispatch(getAdminPGs([])) // Dispatch an empty array
            } else {
                dispatch(getAdminPGs(response.data))
            }
        }catch(e){
            alert(e.message)
        }
    }
}

export const getAdminPGs = (data) => {
    return {
        type : "GET_ADMIN_PG_DETAILS",
        payload : data
    }
}


export const startGetListOfPgs = () => {
    return async(dispatch) => {
        try{
            const response = await axios.get('http://localhost:3800/api/pgdetails/allPgs', {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('res-allPGs', response.data)
            dispatch(getAllPGs(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getAllPGs = (data) => {
    return {
        type:"ALL_PGS",
        payload : data
    }
}

export const startShowPG = (pgDetailsId) => {
    return async(dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/pgdetails/showSinglePg/${pgDetailsId}`,{
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('res-single-Pg', response.data)
            dispatch(getShowPG(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getShowPG = (data) => {
    return{
        type : "SHOW_PG",
        payload : data
    }
}

export const startEditPg = (pgDetailsId,formData,reset) =>{
    return async(dispatch) => {
        try{
            const response = await axios.put(`http://localhost:3800/api/pgdetails/updatePg/${pgDetailsId}`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            console.log('res-edit-pg', response.data)
            dispatch(editPg(response.data))   
            reset()
            Swal.fire({
                title:'PG successfully edited',
                icon :'success'
            })
        }catch(e){
            alert(e.message)
        }
    }
}

export const editPg = (data) => {
    return{
        type : "EDIT_PG",
        payload : data
    }
}


export const startDestroyPg = (pgdetailsId) =>{
    return async(dispatch) => {
        try{
            const response = await axios.delete(`http://localhost:3800/api/pgdetails/destroyPg/${pgdetailsId}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            console.log('res-destroy-pg', response.data)
            dispatch(destroyPg(response.data._id))
            Swal.fire({
                title:'PG successfully deleted',
                icon :'success'
            })
        }catch(e){
            alert(e.message)
        }
    }
}

export const destroyPg = (pgDetailsId) => {
    return{
        type : "DESTROY_PG",
        payload : pgDetailsId
    }
}
