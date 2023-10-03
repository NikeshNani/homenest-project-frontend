import React, { useEffect } from "react"
import CompletedPayments from "./CompletedPayments"
import PendingPayments from "./PendingPayments"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  startGetCompletedPaymentsTotal,
  startGetCompletedPayments,
  startGetPendingPayments,
  startGetPendingPaymentsTotal,
} from "../actions/paymentActions"

const PaymentDetails = (props) => {
  const { pgDetailsId } = useParams()
  const completedPaymentsTotal = useSelector((state) => {
    return state.payments.completedPaymentsTotal
  })
  console.log("completed-total", completedPaymentsTotal)
  const pendingPaymentsTotal = useSelector((state) => {
    return state.payments.pendingPaymentsTotal
  })
  console.log("pending-total", pendingPaymentsTotal)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startGetCompletedPayments(pgDetailsId))
    dispatch(startGetPendingPayments(pgDetailsId))
    dispatch(startGetCompletedPaymentsTotal(pgDetailsId))
    dispatch(startGetPendingPaymentsTotal(pgDetailsId))
  }, [dispatch, pgDetailsId])

  return (
    <div>
      <h3 className="mb-3 text-center" style={{ color: "#EE6C13" }}>
        Payment Details
      </h3>
      <div className="row">
        <div className="col-md-6">
          <h5 className="card-title text-center" style={{ color: "#9A32E7" }}>
            Completed Payments
          </h5> <br />
          <div className="card mb-3">
            <div className="card-body">
              <p className="card-text">
                Completed Payments Amount - {completedPaymentsTotal}
              </p>
            </div>
          </div>
          <div className="card mb-3 ">
            <div
              className="card-body"
              style={{ overflowY: "scroll", maxHeight: "160px" }}
            >
              <CompletedPayments />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h5 className="card-title text-center" style={{ color: "#9A32E7" }}>
            Pending Payments
          </h5> <br />
          <div className="card mb-3">
            <div className="card-body">
              <p className="card-text" >
                Pending Payments Amount - {pendingPaymentsTotal}
              </p>
            </div>
          </div>
          <div className="card mb-3">
            <div
              className="card-body"
              style={{ overflowY: "scroll", maxHeight: "160px" }}
            >
              <PendingPayments />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails
