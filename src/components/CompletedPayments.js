import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetCompletedPayments } from "../actions/paymentActions"
import { useParams } from "react-router-dom"

const CompletedPayments = (props) => {
    const {pgDetailsId} = useParams()
    const completedPayments = useSelector((state)=>{
        return state.payments.completedPayments
    })
    console.log('completed-payments', completedPayments)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startGetCompletedPayments(pgDetailsId))
    }, [dispatch, pgDetailsId])
    return (
        <div>
            <h4>Completed Payments - {completedPayments.length} </h4>
            {completedPayments.map((ele)=>{
                return(
                    <div key={ele._id}> 
                        <li> Resident Name : {ele.residentId && ele.residentId.name} - Amount : {ele.amount} </li>
                    </div>
                )
            })}
        </div>
    )
}
export default CompletedPayments