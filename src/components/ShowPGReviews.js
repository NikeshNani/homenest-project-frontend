import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetAllReviewsForPGAdmin } from "../actions/reviewRatingActions"

const ShowPGReviews = (props) =>{
    const {handleCancel, pgDetailsId} = props

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetAllReviewsForPGAdmin(pgDetailsId))
    },[dispatch, pgDetailsId])
    const reviewsAndRatingsOfPg = useSelector((state)=>{
        return state.reviewsAndRatings.reviewsAndRatings
    })
    console.log('reviewsAndRatingsOfPg',reviewsAndRatingsOfPg)


    return(
        <div>
            {reviewsAndRatingsOfPg.map((ele)=>{
                return(
                    <div key={ele._id}>
                        <li> {ele.review} - {ele.residentName} - {ele.createdAt.slice(0,10)} </li>
                    </div>
                )
            })}
            <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default ShowPGReviews