import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { startGetAdminPgDetails, startGetListOfPgs } from './actions/pgDetailsActions'

const App = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [role, setRole] = useState('')
    const dispatch = useDispatch()

    const handleAuth = () => {
      setUserLoggedIn(!userLoggedIn)
    }


    useEffect(() => {
        if (userLoggedIn) {
            const token = localStorage.getItem('token')
            const decoded = jwt_decode(token)
            const userRole = decoded.role
            setRole(userRole)

            if (userRole === 'pg_admin'){ 
                dispatch(startGetAdminPgDetails())  
            }
            if (userRole === 'pg_resident') {
                dispatch(startGetListOfPgs())
            }
        }
    }, [dispatch, userLoggedIn])
    
    useEffect(()=>{
        if(localStorage.getItem('token')){
            handleAuth()
        }
    },[])

    return (
        <div>
        <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} role={role} />
        </div>
    )
}

export default App


