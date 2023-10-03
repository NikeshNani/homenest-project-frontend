import React, { useReducer, useState } from "react"
import { Link } from "react-router-dom"
import validator from "validator"
import axios from "axios"
import Swal from "sweetalert2"
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = (props) => {
    const [formErrors, setFormErrors] = useState({})

    const reducer = (state, action) => {
        switch (action.type) {
            case "LOGIN_INFO":
                return { ...state, [action.field]: action.value }
            case "RESET_FORM":
                return { ...initialState }
            default:
                return state
        }
    }

    const initialState = {
        email: "",
        password: "",
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleInputChange = (field) => (e) => {
        dispatch({ type: "LOGIN_INFO", field, value: e.target.value })
    }

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const validateForm = () => {
        const errors = {}

        if (state.email.trim().length === 0) {
            errors.email = "Email is required"
        } else if (!validator.isEmail(state.email)) {
            errors.email = "Invalid email format"
        }

        if (state.password.trim().length === 0) {
            errors.password = "Password is required"
        } else if (!validator.isStrongPassword(state.password)) {
            errors.password = "Invalid password"
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {
            const formData = {
                email: state.email,
                password: state.password,
            }
            try {
                const login = await axios.post(
                    "http://localhost:3800/api/users/login",
                    formData
                )
                const loginToken = login.data
                localStorage.setItem("token", loginToken.token)
                props.history.push("/")
                props.handleAuth()
                setFormErrors({})

                Swal.fire({
                    icon: "success",
                    title: "Welcome back!",
                    text: "You have successfully logged in.",
                })
            } catch (error) {
                console.error("Error:", error)
                Swal.fire({
                    icon: "error",
                    title: "Oops....",
                    text: "Something went wrong! Please try again later.",
                })
            }
            dispatch({ type: "RESET_FORM" })
        }
    }

    return (
        <div className="container text-center" style={{ marginTop: "5px" }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{
                        border: '1px solid',
                        padding: '20px',
                        borderRadius: '5px',
                        maxWidth: '400px',
                        margin: '0 auto',
                        marginTop: '20px'
                    }}>
                        <div className="card-body">
                            <h1 className="text-center" style={{ color: '#D541E3' }}>Welcome Back</h1>
                            <h2 className="text-center">Login to your account</h2>
                            <form onSubmit={handleSubmit}>
                                <label>Email</label> <span style={{ color: 'red' }}>*</span><br/>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter the email"
                                    value={state.email}
                                    onChange={handleInputChange("email")}
                                    className="form-control"
                                />
                                {formErrors.email && (
                                    <p style={{ color: "red" }}>{formErrors.email}</p>
                                )}

                                <label>Password</label> <span style={{ color: 'red' }}>*</span>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter the password"
                                        value={state.password}
                                        onChange={handleInputChange("password")}
                                        className="form-control"
                                    />
                                    <div className="input-group-append" style={{marginLeft:"5px"}}>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                <br />
                                {formErrors.password && (
                                    <p style={{ color: "red" }}>{formErrors.password}</p>
                                )}

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </form>
                            <h6 className="text-center">
                                Don't have an account? Register here{" "}
                                <Link to="/register">Register</Link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login


