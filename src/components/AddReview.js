import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { startAddReview } from "../actions/reviewRatingActions"
import StarRatings from 'react-star-ratings'

const AddReview = (props) => {
    const { handleCancel, pgDetailsId } = props

    const [review, setReview] = useState("")
    const [food, setFood] = useState(0)
    const [facilities, setFacilities] = useState(0)
    const [hygienic, setHygienic] = useState(0)
    const [safety, setSafety] = useState(0)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = {
                review,
                rating: {
                    food,
                    facilities,
                    hygienic,
                    safety,
                },
                pgDetailsId,
            }
            const reset = () => {
                setReview("")
                setFood(0)
                setFacilities(0)
                setHygienic(0)
                setSafety(0)
            }
            dispatch(startAddReview(formData, reset))
        } catch (error) {
            console.error("Error adding review:", error)
        }
    }

    return (
        <div className="text-center">
            <h2>Add Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{margin:"10px"}}>
                    <label htmlFor="review">Review</label>
                    <input
                        type="text"
                        id="review"
                        className="form-control"
                        placeholder="Write a review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label style={{marginRight:"20px"}}>Food Rating</label>
                    <StarRatings
                        rating={food}
                        starRatedColor="gold"
                        changeRating={(newRating) => setFood(newRating)}
                        numberOfStars={5}
                        starDimension="24px"
                        name="foodRating"
                    />
                </div>

                <div className="mb-3"></div>

                <div className="form-group">
                    <label style={{marginRight:"20px"}}>Facilities Rating</label>
                    <StarRatings
                        rating={facilities}
                        starRatedColor="gold"
                        changeRating={(newRating) => setFacilities(newRating)}
                        numberOfStars={5}
                        starDimension="24px"
                        name="facilitiesRating"
                    />
                </div>

                <div className="mb-3"></div>

                <div className="form-group">
                    <label style={{marginRight:"20px"}}>Hygienic Rating</label>
                    <StarRatings
                        rating={hygienic}
                        starRatedColor="gold"
                        changeRating={(newRating) => setHygienic(newRating)}
                        numberOfStars={5}
                        starDimension="24px"
                        name="hygienicRating"
                    />
                </div>

                <div className="mb-3"></div>

                <div className="form-group">
                    <label style={{marginRight:"20px"}}>Safety Rating</label>
                    <StarRatings
                        rating={safety}
                        starRatedColor="gold"
                        changeRating={(newRating) => setSafety(newRating)}
                        numberOfStars={5}
                        starDimension="24px"
                        name="safetyRating"
                    />
                </div>

                <div className="mb-3"></div>

                <button type="submit" style={{
                        margin: '5px',
                        padding: '10px',
                        backgroundColor: '#23C126',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px'
                    }}>Submit Review</button>
                <button type="button" onClick={handleCancel} style={{
                        margin: '5px',
                        padding: '10px',
                        backgroundColor: '#E10C20',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px'
                    }}>Cancel</button>
            </form>
        </div>
    )
}

export default AddReview
