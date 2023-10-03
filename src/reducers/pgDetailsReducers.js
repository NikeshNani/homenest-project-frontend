const initialState = {
    pgDetails : [], 
    allPgs : [], 
    selectedPG : {}
}

const pgDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_ADMIN_PG_DETAILS" : {
            return {...state, pgDetails : action.payload}
        }
        case "CREATE_PG":{
            return {...state, pgDetails : [...state.pgDetails, action.payload]}
        }
        case "ALL_PGS" : {
            return {...state, allPgs : action.payload}
        }
        case "SHOW_PG" : {
            return {...state, selectedPG : action.payload}
        }
        case "EDIT_PG": {
            const editedPG = action.payload
            const updatedPgDetails = state.pgDetails.map((pg) => {
                if (pg._id === editedPG._id) {
                    return editedPG
                }
                return pg
            })
            return { ...state, pgDetails: updatedPgDetails }
        }
        case 'DESTROY_PG': {
            const removedPGId = action.payload
            const updatedPgDetails = state.pgDetails.filter((pg) => pg._id !== removedPGId)
            return { ...state, pgDetails: updatedPgDetails }
        }
        default : {
            return {...state}
        }
    }
}

export default pgDetailsReducer