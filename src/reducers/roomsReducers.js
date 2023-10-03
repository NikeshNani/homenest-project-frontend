const initialState = {
    rooms : [], 
    availableRooms : [],
    unAvailableRooms : [], 
    selectedRoom : {},
    availableRoomsForResident : []
}

const roomsReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_ALL_ROOMS" : {
            return {...state , rooms : action.payload}
        }
        case "GET_AVAILABLE_ROOMS" : {
            return {...state , availableRooms : action.payload}
        }
        case "GET_UNAVAILABLE_ROOMS" : {
            return {...state , unAvailableRooms : action.payload}
        }
        case "ADD_ROOM" : {
            return {...state, 
                rooms : [...state.rooms, action.payload], 
                availableRooms : [...state.availableRooms,action.payload]
            }
        }
        case "SHOW_SINGLE_ROOM" :{
            return {...state, selectedRoom : action.payload}
        }
        case "REMOVE_ROOM" : {
            console.log('remove-action', action.payload)
            const updatedRooms = state.rooms.filter((room) => room._id !== action.payload._id)
            const updatedAvailableRooms = state.availableRooms.filter((room)=>room._id !== action.payload._id)
            return { ...state, rooms : updatedRooms , availableRooms : updatedAvailableRooms}
        }
        case "GET_AVAILABLE_ROOMS_FOR_RESIDENT" : {
            return {...state , availableRoomsForResident : action.payload}
        }
        case "EDIT_ROOM" : {
            const updatedRoom = state.rooms.map((ele)=>
            {
                if(ele._id === action.payload._id)
                {
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })
            const updatedAvailableRoom = state.availableRooms.map((ele)=>
            {
                if(ele._id === action.payload._id)
                {
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })
            const updatedUnAvailableRoom = state.unAvailableRooms.map((ele)=>
            {
                if(ele._id === action.payload._id)
                {
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })
            return {...state, rooms : updatedRoom, availableRooms : updatedAvailableRoom, unAvailableRooms : updatedUnAvailableRoom}
        }
        // case "CLEAR_SELECTED_ROOM" : {
        //     return  {...state,selectedRoom : {}}
        // }
        default : {
            return {...state}
        }
    }
}
export default roomsReducer