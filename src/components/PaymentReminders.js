import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentReminders = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState("")

    const {pgDetailsId} = useParams()
    console.log('pgId', pgDetailsId)

    const sendPaymentReminders = async () => {
        setIsLoading(true)
        setIsError(false)
        setMessage("") // Clear any previous error message

        try {
            const response = await axios.post(`http://localhost:3800/api/payments/sendPaymentReminders/${pgDetailsId}`, {}, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            setMessage(response.data.message)
        } catch (error) {
            setIsError(true)
            console.error("Error sending payment reminders:", error)
            setMessage(error.response.data.error)
        }
    }

    return (
        <div className="mb-3 text-center" >
            <h3 style={{ color: "#EE6C13" }}>Send Payment Reminders</h3>
            <button style={{
                        margin: '5px',
                        padding: '10px',
                        backgroundColor: '#5CBDB6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px'
                    }} onClick={sendPaymentReminders}>
                Send Reminders
            </button>
            {isLoading && !message && <p>Loading...</p>}
            {isError && message }
            {message && <p>{message}</p>}
        </div>
    )
}

export default PaymentReminders
