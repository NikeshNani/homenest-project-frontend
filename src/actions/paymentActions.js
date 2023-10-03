import axios from "axios"
export const startGetCompletedPayments = (pgDetailsId) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/payments/getCompletedPayments/${pgDetailsId}`,{
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('payments-completed-res', response.data)
            dispatch(getCompletedPayments(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}
export const getCompletedPayments = (data) => {
    return{
        type:'GET_COMPLETED_PAYMENTS',
        payload:data
    }
}

export const startGetPendingPayments = (pgDetailsId) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/payments/getPendingPayments/${pgDetailsId}`,{
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('payments-Pending-res', response.data)
            dispatch(getPendingPayments(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}
export const getPendingPayments = (data) => {
    return{
        type:'GET_PENDING_PAYMENTS',
        payload:data
    }
}

// Async action creator to fetch total completed payments amount
export const startGetCompletedPaymentsTotal = (pgDetailsId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3800/api/payments/getCompletedPaymentsTotal/${pgDetailsId}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            console.log('completed-payments-total', response.data)
            dispatch(getCompletedPaymentsTotal(response.data))
        } catch (error) {
            alert(error.message)
        }
    }
}
// Action creator for getting total completed payments
export const getCompletedPaymentsTotal = (totalAmount) => {
    return {
        type: "GET_COMPLETED_PAYMENTS_TOTAL",
        payload: totalAmount,
    }
}

export const startGetPendingPaymentsTotal = (pgDetailsId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3800/api/payments/getPendingPaymentsTotal/${pgDetailsId}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            console.log('pending-payments-total', response.data)
            dispatch(getPendingPaymentsTotal(response.data))
        } catch (error) {
            alert(error.message)
        }
    }
}
// Action creator for getting total Pending payments
export const getPendingPaymentsTotal = (totalAmount) => {
    return {
        type: "GET_PENDING_PAYMENTS_TOTAL",
        payload: totalAmount,
    }
}

