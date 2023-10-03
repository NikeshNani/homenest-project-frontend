const initialState = {
    reviewsAndRatings : [],
    allReviewsForPG : []
}

const reviewsAndRatingsReducer = (state = initialState , action) => {
    switch(action.type){
        case "GET_ALL_REVIEWS_FOR_ADMIN" : {
            return {...state , reviewsAndRatings : action.payload}
        }
        case "ADD_REVIEW" : {
            return {...state, 
                allReviewsForPG : [...state.allReviewsForPG, action.payload],
                reviewsAndRatings : [...state.reviewsAndRatings, action.payload]
            }
        }
        case "GET_ALL_REVIEWS_SELECTED_PG" : {
            console.log('review-pg-action', action.payload)
            return {...state, allReviewsForPG : action.payload}
        }
        case "EDIT_REVIEW" : {
            console.log('edit-review-res-action', action.payload)
            const updatedReview = state.reviewsAndRatings.map((ele)=>
            {
                if(ele._id === action.payload._id)
                {
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })
            const updatedReview1 = state.allReviewsForPG.map((ele)=>
            {
                if(ele._id === action.payload._id)
                {
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })
            return {...state, reviewsAndRatings : updatedReview, allReviewsForPG : updatedReview1}

        }
        case "REMOVE_REVIEW" : {
            const result = state.reviewsAndRatings.filter((ele)=>{
                return ele._id !== action.payload._id
            })
            const result1 = state.allReviewsForPG.filter((ele)=>{
                return ele._id !== action.payload._id
            })
            return {...state, reviewsAndRatings : result, allReviewsForPG : result1}
        }
        case "CLEAR_REVIEWS" : {
            return {...state, allReviewsForPG : []}
        }
        default : {
            return state
        }
    }
}

export default reviewsAndRatingsReducer
