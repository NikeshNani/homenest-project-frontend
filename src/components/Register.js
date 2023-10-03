import React, { useReducer, useState } from "react"
import validator from "validator"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { startRegisterUser } from "../actions/usersActions"
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Register = (props) => {
  const dispatch = useDispatch()
  const [formErrors, setFormErrors] = useState({})
  const reducer = (state, action) => {
    switch (action.type) {
      case "USER_INFO":
        return { ...state, [action.field]: action.value }
      case "RESET_FORM":
        return { ...initialState }
      default:
        return state
    }
  }

  const initialState = {
    username: "",
    email: "",
    password: "",
    role: "",
  }
  const [state, userDispatch] = useReducer(reducer, initialState)

  const handleInputChange = (field) => (e) => {
    userDispatch({ type: "USER_INFO", field, value: e.target.value })
  }

  const validateForm = () => {
    const errors = {}
    if (!state.username.trim()) {
      errors.username = "Username is required"
    }

    if (state.email.trim().length === 0) {
      errors.email = "Email is required"
    } else if (!validator.isEmail(state.email)) {
      errors.email = "Invalid email format"
    }

    if (state.password.trim().length === 0) {
      errors.password = "Password is required"
    } else if (!validator.isStrongPassword(state.password)) {
      errors.password = "minLength: 8,minLowercase: 1,minUppercase: 1,minNumbers: 1,minSymbols: 1"
    }

    if (!state.role.trim()) {
      errors.role = "Role selection is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      const formData = {
        username: state.username,
        email: state.email,
        password: state.password,
        role: state.role,
      }
      try {
        await dispatch(startRegisterUser(formData))
        userDispatch({ type: "RESET_FORM" })
        setFormErrors({})
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Thank you for registering with us. Check your email for login details.",
        })
        props.history.push("/login")
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: "An error occurred during registration. Please try again later.",
        })
      }
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
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
              <h1 style={{color : '#FF339C'}}>Register With Us</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label> <span style={{ color: 'red' }}>*</span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter the username"
                    value={state.username}
                    onChange={handleInputChange("username")}
                    className="form-control"
                  />
                  {formErrors.username && (
                    <p style={{ color: "red" }}>{formErrors.username}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Email</label> <span style={{ color: 'red' }}>*</span>
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
                </div>

                <div className="form-group">
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
                  {formErrors.password && (
                    <p style={{ color: "red" }}>{formErrors.password}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Select Role</label> <span style={{ color: 'red' }}>*</span>
                  <select
                    name="role"
                    onChange={handleInputChange("role")}
                    value={state.role}
                    className="form-control"
                  >
                    <option value="">Select Role</option>
                    <option value="pg_admin">Pg Admin</option>
                    <option value="pg_resident">Pg Resident</option>
                  </select>
                  {formErrors.role && (
                    <p style={{ color: "red" }}>{formErrors.role}</p>
                  )}
                </div>
                <div>
                  <button type="submit" style={{
                    margin: '5px',
                    padding: '10px',
                    backgroundColor: '#5CBDB6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px'
                }}>
                    Register
                </button>
                </div>
              </form>
              <br />
              <h4>
                Already have an account? Login here <Link to="/login">Login</Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
