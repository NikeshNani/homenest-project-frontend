import Swal from 'sweetalert2'
import axios from "axios"

export const startAddReview = (formData, reset) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:3800/api/reviews-ratings/addReview', formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            console.log('add-review-res', response.data)
            dispatch(addReview(response.data))
            reset()
            // Show a success message
            Swal.fire({
                icon: 'success',
                title: 'Review Added Successfully',
                text: 'Your review has been added successfully.',
            })

        } catch (e) {
            //alert(e.message)
            // Handle errors and show error messages from the backend 
            const errorMessage =
                e.response && e.response.data ? e.response.data.error : 'An error occurred.'
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            })
        }
    }
}

export const addReview = (data) => {
    return {
        type: "ADD_REVIEW",
        payload: data
    }
}

export const startGetAllReviewsForPGAdmin = (pgDetailsId) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/reviews-ratings/allReviewsForAdmin/${pgDetailsId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-reviews-res-admin', response.data)
            dispatch(getAllReviewsForAdmin(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getAllReviewsForAdmin = (data) => {
    return{
        type : "GET_ALL_REVIEWS_FOR_ADMIN",
        payload : data
    }
}

export const startGetAllReviewsForSelectedPg = (pgDetailsId) => {
    console.log('pgId-action-selectedPg', pgDetailsId)
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3800/api/reviews-ratings/allReviewsForSelectedPg/${pgDetailsId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('all-reviews-res-selectedPG', response.data)
            dispatch(getAllReviewsForSelectedPg(response.data))
        }catch(e){
            alert(e.message)
        }
    }
}

export const getAllReviewsForSelectedPg = (data) => {
    return{
        type : "GET_ALL_REVIEWS_SELECTED_PG",
        payload : data
    }
}

export const startEditReview = (reviewId, data) => {
    return async (dispatch) => {
        try{
            const response = await axios.put(`http://localhost:3800/api/reviews-ratings/updateReview/${reviewId}`, {review : data},{
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('edit-review-res', response.data)
            dispatch(editReview(response.data))
            // Show a success message
            Swal.fire({
                icon: 'success',
                title: 'Review updated Successfully',
                text: 'Your review has been updated successfully.',
            })
        }catch(e){
            //alert(e.message)
            // Handle errors and show error messages from the backend 
            const errorMessage =
                e.response && e.response.data ? e.response.data.error : 'An error occurred.'
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            })
        }
    }
}

export const editReview = (data) => {
    return{
        type: "EDIT_REVIEW" ,payload :  data
    }
}

export const startDeleteReview = (reviewId) => {
    return async (dispatch) => {
        try{
            const response = await axios.delete(`http://localhost:3800/api/reviews-ratings/destroyReview/${reviewId}`, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
            console.log('Delete-review-res', response.data)
            dispatch(deleteReview(response.data))
            // Show a success message 
            Swal.fire({
                icon: 'success',
                title: 'Review deleted Successfully',
                text: 'Your review has been deleted successfully.',
            })
        }catch(e){
            // Handle errors and show error messages from the backend in Swal dialogs
            const errorMessage =
                e.response && e.response.data ? e.response.data.error : 'An error occurred.'
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            })
        }
    }
}

export const deleteReview = (data) => {
    return{
        type: "REMOVE_REVIEW" ,payload :  data
    }
}

export const clearReviews = () => {
    return {
        type : "CLEAR_REVIEWS"
    }
}