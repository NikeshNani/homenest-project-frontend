import axios from "axios"
import Swal from "sweetalert2"

export const startCreateRoom = (formData, pgDetailsId, reset) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
            `http://localhost:3800/api/rooms/addRoom/${pgDetailsId}`,
            formData,
            {
                headers: {
                'x-auth': localStorage.getItem('token'),
                },
            })
            console.log('room-added',response.data)
            // Check if there are rooms in the response
            if (response.data&& response.data.length > 0) {
                // reduce to accumulate room details into a single string
                const roomDetails = response.data.reduce((details, room, index) => {
                    details += `Room ${index + 1} Details:\n`
                    details += `Sharing: ${room.sharing}\n`
                    details += `Room Number: ${room.roomNumber}\n`
                    details += `Floor: ${room.floor}\n\n`
                    return details
                }, '')

                
                // Show a Swal popup with the room details
                Swal.fire({
                    title: "Rooms added successfully",
                    icon: 'success',
                    html : `${response.data.length} Room(s) Added\n\n <br><br>${roomDetails}`,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
                // Dispatch the createRoom action with the response data
                dispatch(createRoom(response.data))

                // Call the reset function to clear form data
                reset()
            }
        } catch (e) {
            // Show an error message if an error occurs while adding a room
            Swal.fire({
            title: 'Error',
            text: 'An error occurred while adding a room.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            })
        }
    }
}

export const createRoom = (data) => {
    return{
        type : "ADD_ROOM",
        payload : data
    }
}

export const startGetAllRooms = (pgDetailsId) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/rooms/allRooms?pgDetailsId=${pgDetailsId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-rooms', response.data)
            dispatch(getAllRooms(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getAllRooms = (data) => {
    return{
        type : "GET_ALL_ROOMS",
        payload : data
    }
}

export const startGetAvailableRooms = (pgDetailsId) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/rooms/availableRooms?pgDetailsId=${pgDetailsId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-available-rooms', response.data)
            dispatch(getAvailableRooms(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getAvailableRooms = (data) => {
    return{
        type : "GET_AVAILABLE_ROOMS",
        payload : data
    }
}

export const startGetAvailableRoomsForResident = (pgDetailsId) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/rooms/availableRoomsForResident/${pgDetailsId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-available-rooms-resident', response.data)
            dispatch(getAvailableRoomsForResident(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getAvailableRoomsForResident = (data) => {
    return{
        type : "GET_AVAILABLE_ROOMS_FOR_RESIDENT",
        payload : data
    }
}

export const startGetUnAvailableRooms = (pgDetailsId) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/rooms/unAvailableRooms?pgDetailsId=${pgDetailsId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-unavailable-rooms', response.data)
            dispatch(getunAvailableRooms(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getunAvailableRooms = (data) => {
    return{
        type : "GET_UNAVAILABLE_ROOMS",
        payload : data
    }
}

export const startShowSelectedRoom = (roomId, pgDetailsId) => {
    return async (dispatch)=>{
        try{
            const response = await axios.get(`http://localhost:3800/api/rooms/particularRoom/${roomId}?pgDetailsId=${pgDetailsId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('single-room-res', response.data)
            dispatch(showSingleRoom(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const showSingleRoom = (data) => {
    return{
        type :"SHOW_SINGLE_ROOM" ,
        payload : data
    }
}

export const startRemoveRoom = (roomId, pgDetailsId) => {
    return async (dispatch) => {
      try {
        // Display the confirmation dialog
        const confirmationResult = await Swal.fire({
          icon: 'question',
          title: 'Are you sure?',
          showCancelButton: true, // Display cancel button
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel', // Text for the cancel button
        })
  
        // Check if the user clicked "Cancel"
        if (!confirmationResult.isConfirmed) {
          return // Do nothing if the user canceled
        }
  
        // If the user clicked "OK," proceed with room removal
        const response = await axios.delete(`http://localhost:3800/api/rooms/destroyRoom/${roomId}?pgDetailsId=${pgDetailsId}`, {
          headers: {
            'x-auth': localStorage.getItem('token'),
          },
        })
  
        console.log('remove-room-res', response.data)
        // Check if the response contains a warning message
        if (response.data.message && response.data.message.startsWith('Cannot delete room.')) {
          // Show a Swal warning with the error message from the server
          Swal.fire({
            icon: 'warning',
            title: 'Cannot Delete Room',
            text: response.data.message,
          })
        } else {
          // Dispatch the removeRoom action with the response data
          Swal.fire({
            icon: 'success',
            title: 'Room deleted successfully',
            text: response.data.message,
          })
          dispatch(removeRoom(response.data))
        }
      } catch (e) {
        alert(e.message)
      }
    }
}

export const removeRoom = (data) => {
    return{
        type : "REMOVE_ROOM",
        payload : data
    }
}

export const startEditRoom = (roomId, pgDetailsId, updatedRoom, reset) => {
    return async (dispatch) => {
        try{
            const response = await axios.put(`http://localhost:3800/api/rooms/updateRoom/${roomId}?pgDetailsId=${pgDetailsId}`, updatedRoom , {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(editRoom(response.data))
            reset()
        }catch(e){
            alert(e.message)
        }
    }
}

export const editRoom = (data) => {
    return {
        type : "EDIT_ROOM",
        payload : data
    }
}
