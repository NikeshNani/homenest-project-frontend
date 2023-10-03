import React, { useState, useEffect, useContext } from "react"
import axios from 'axios'
import { RoleContext } from "./NavBar"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const Account = (props) => {
    const [residentPgDetails, setResidentPgDetails] = useState({})
    const [user, setUser] = useState({})
    const { userLoggedIn, role } = useContext(RoleContext)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        if (userLoggedIn) {
            axios.get('http://localhost:3800/api/users/account', {
                headers: {
                    "x-auth": localStorage.getItem('token')
                }
            })
                .then((res) => {
                    console.log('account-res', res.data)
                    setUser(res.data)
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    }, [userLoggedIn])

    const handlePgDetails = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3800/api/residents/pgDetails/${userId}`)
            console.log(response.data)
            setResidentPgDetails(response.data)
            setShowDetails(true) // Show details when the button is clicked
        }
        catch (e) {
            alert(e.message)
        }
    }

    return (
        <div className="container">
            <div className="text-center">
                <h1>User Account Details</h1>
                <p>User Name - {user.username}</p>
                <p>Email - {user.email}</p>
                <p>Role - {user.role}</p>
                {role === 'pg_resident' &&
                    <>
                        <button onClick={() => handlePgDetails(user.id)}>Get PG Details</button>
                        {showDetails && // Show details only if showDetails is true
                            <div>
                                Profile: {residentPgDetails.profileImage && <img src={residentPgDetails.profileImage} width="100px" height="100px" alt="ProfileImage" />}
                                <li>Name : {residentPgDetails.name}</li>
                                <li>PG Name: {residentPgDetails.pgDetailsId && residentPgDetails.pgDetailsId.name}</li>
                                <li>Date Of Joining: {residentPgDetails.dateOfJoining && residentPgDetails.dateOfJoining.slice(0, 10)}</li>
                                Allocated Details:
                                <li>Room Number: {residentPgDetails.roomId && residentPgDetails.roomId.roomNumber}</li>
                                <li>Sharing: {residentPgDetails.roomId && residentPgDetails.roomId.sharing}</li>
                                <li>Floor Number: {residentPgDetails.roomId && residentPgDetails.roomId.floor}</li>
                            </div>
                        }
                    </>
                }
                <Link to = "/">Home</Link>
            </div>
        </div>
    )
}

export default Account
