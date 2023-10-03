import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetPendingPayments } from "../actions/paymentActions"
import { useParams } from "react-router-dom"

const PendingPayments = (props) => {

    const {pgDetailsId} = useParams()
    const pendingPayments = useSelector((state)=>{
        return state.payments.pendingPayments
    })
    console.log('pending-payments', pendingPayments)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startGetPendingPayments(pgDetailsId))
    }, [dispatch, pgDetailsId])
    return (
        <div>
            <h4 >Pending Payments - {pendingPayments.length} </h4>
            {pendingPayments.map((ele)=>{
                return(
                    <div key={ele._id}>
                        <li> Resident Name : {ele.residentId && ele.residentId.name} - Amount : {ele.amount} </li>
                    </div>
                )
            })}
        </div>
    )
}
export default PendingPayments