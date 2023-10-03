const initialState = {
    completedPayments : [],
    pendingPayments : [],
    completedPaymentsTotal: 0, 
    pendingPaymentsTotal: 0,   
}

const paymentsReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_COMPLETED_PAYMENTS" : {
            return {...state, completedPayments : action.payload}
        }
        case "GET_PENDING_PAYMENTS" : {
            return {...state, pendingPayments : action.payload}
        }
        case "GET_COMPLETED_PAYMENTS_TOTAL": {
            return { ...state, completedPaymentsTotal: action.payload }
        }
        case "GET_PENDING_PAYMENTS_TOTAL": {
            return { ...state, pendingPaymentsTotal: action.payload }
        }
        default : {
            return state
        }
    }
}

export default paymentsReducer

