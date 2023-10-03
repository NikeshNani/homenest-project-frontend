import axios from 'axios'

export const startRegisterUser = (formData) =>{
    return async(dispatch) => {
        try{
            const response = await axios.post('http://localhost:3800/api/users/register', formData)
            console.log('register-res', response.data)
            dispatch(registerUser(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const registerUser = (data) => {
    return{
        type:'REGISTER_USER',
        payload : data
    }
}

export const startGetUsers = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3800/api/users/allusers')
            console.log('users-res', response.data)
            dispatch(getUsers(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getUsers = (data) => {
    return{
        type : 'GET_USERS',
        payload : data
    }
}