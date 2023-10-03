import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import AverageRating from "./AverageRating"
import ResidentsDetails from "./ResidentsDetails"
import RoomDetails from "./RoomDetails"
import PaymentReminders from "./PaymentReminders"
import PaymentDetails from "./PaymentsDetails"
import PaymentsPieChart from "./PaymentsPieChart"
import RoomPieChart from "./RoomPieChart"
import { RoleContext } from "./NavBar"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { startGetAllReviewsForPGAdmin } from "../actions/reviewRatingActions"
import {
  startGetCompletedPayments,
  startGetCompletedPaymentsTotal,
  startGetPendingPayments,
  startGetPendingPaymentsTotal,
} from "../actions/paymentActions"
import { startGetResidents } from "../actions/residentsActions"

const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px", // Adjust as needed for spacing between rows
}

const columnStyle = {
    flex: 1,
    marginRight: "10px", // Adjust as needed for spacing between columns
}

const linkContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px", // Adjust as needed for spacing from the components
}

const linkStyle = {
    marginLeft: "10px", // Adjust as needed for spacing between links
}

const AdminDashboard = (props) => {
    const { role } = useContext(RoleContext)
    const { pgDetailsId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(startGetResidents(pgDetailsId))
      dispatch(startGetAllReviewsForPGAdmin(pgDetailsId))
      dispatch(startGetCompletedPayments(pgDetailsId))
      dispatch(startGetPendingPayments(pgDetailsId))
      dispatch(startGetCompletedPaymentsTotal(pgDetailsId))
      dispatch(startGetPendingPaymentsTotal(pgDetailsId))
    })

    return (
      <div>
        {role === "pg_admin" && (
          <div>
            <div style={linkContainerStyle}>
              <Link style={linkStyle} to={`/addroom/${pgDetailsId}`}>
                Add Room
              </Link>
              <Link style={linkStyle} to={`/addresident/${pgDetailsId}`}>
                Add Resident
              </Link>
              <Link style={linkStyle} to={`/vacated-residents/${pgDetailsId}`}>
                Vacated Residents
              </Link>
            </div>
            <div style={rowStyle}>
              <div style={columnStyle}>
                <ResidentsDetails />
              </div>
              <div style={columnStyle}>
                <RoomDetails />
              </div>
            </div>
            <div style={rowStyle}>
              <div style={columnStyle}>
                <PaymentDetails />
              </div>
              <div style={columnStyle}>
                <AverageRating />
              </div>
            </div>
            <div style={rowStyle}>
              <div style={columnStyle}>
                <PaymentReminders />
              </div>
              <div style={columnStyle}>
                <RoomPieChart />
              </div>
              <div style={columnStyle}>
                <PaymentsPieChart />
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default AdminDashboard
