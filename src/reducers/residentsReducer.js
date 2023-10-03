const initialState = {
    residentPayments : [],
    residents : [],
    selectedResident : {},
    vacatedResidents : []
}

const residentsReducer = (state = initialState, action) =>{
    switch(action.type){
        case "GET_RESIDENTS" : {
            return {...state, residents : action.payload}
        }
        case "ADD_RESIDENT" : {
            return {...state, residents : [...state.residents, action.payload]}
        }
        case "SINGLE_RESIDENT" : {
            return {...state, selectedResident: action.payload}
        }
        case "REMOVE_RESIDENT" : {
            // Filter out the resident with the specified residentId
            const updatedResidents = state.residents.filter(
                (resident) => resident._id !== action.payload._id
            )

            return { ...state, residents: updatedResidents }
        }
        case 'EDIT_RESIDENT': {
            const updatedResident = state.residents.map((ele)=>{
                if(ele._id === action.payload._id)
                {
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })
            return {...state, residents : updatedResident}
        }
        case "CLEAR_SELECTED_RESIDENT" : {
            return {...state, selectedResident : {}}
        }
        case "GET_VACATED_RESIDENTS" : {
            return {...state, vacatedResidents : action.payload}
        }
        case "GET_RESIDENT_PAYMENTS": {
            return { ...state, residentPayments: action.payload }
        }
        default: {
            return state
        }
    }
}

export default residentsReducer

