import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { startShowPG } from "../actions/pgDetailsActions"
import { startGetAvailableRoomsForResident } from "../actions/roomActions"
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import AddReview from "./AddReview"
import { FaTrash, FaEdit } from 'react-icons/fa'
import { startGetAllReviewsForSelectedPg, startEditReview, startDeleteReview, clearReviews } from "../actions/reviewRatingActions"

const ShowPG = () => {
    // State variable to control the visibility of the AddReview component
    const [showAddReview, setShowAddReview] = useState(false)
    const history = useHistory()
    const { pgDetailsId } = useParams() // Get the pgDetailsId from URL params
    const selectedPG = useSelector((state) => state.pgDetails.selectedPG)

    const allReviewsForPG = useSelector((state) => state.reviewsAndRatings.allReviewsForPG)
    console.log('allReviewsForPg', allReviewsForPG)
    const dispatch = useDispatch()

    useEffect(() => {
        // Fetch the selected PG details when the component mounts
        console.log('useeffect-pgId', pgDetailsId)
        dispatch(startShowPG(pgDetailsId))
        dispatch(startGetAvailableRoomsForResident(pgDetailsId))
        dispatch(startGetAllReviewsForSelectedPg(pgDetailsId))
    }, [dispatch, pgDetailsId])

    useEffect(() => {
        return function () {
            console.log('component removed')
            dispatch(clearReviews())
        }
    }, [dispatch])

    const availableRoomsForResident = useSelector((state) => {
        return state.rooms.availableRoomsForResident
    })
    console.log('availableRoomsforresident', availableRoomsForResident)

    // Function to handle cancellation and show "Add Review" button again
    const handleCancel = () => {
        setShowAddReview(false)
    }

    const handleReviewEdit = (reviewId) => {
        console.log("handle review edit", reviewId)
        const input = prompt('enter review')
        if (input) {
            dispatch(startEditReview(reviewId, input))
            dispatch(startGetAllReviewsForSelectedPg(pgDetailsId))
        }
    }

    const handleReviewRemove = (reviewId) => {
        console.log("remove review", reviewId)
        const confirmation = window.confirm('Are you sure?')
        if (confirmation) {
            dispatch(startDeleteReview(reviewId))
            dispatch(startGetAllReviewsForSelectedPg(pgDetailsId))
        }
    }

    const handleGoToDashboard = () => {
        history.push('/residentdashboard')
    }
    console.log('selectedPG', selectedPG.images)
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <button style={{
                        margin: '5px',
                        padding: '10px',
                        backgroundColor: '#64B2E4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px'
                    }} onClick={()=>handleGoToDashboard()}>Back to dashboard</button>
                </div>
                <div className="card-body">
                    <h1 className="card-title text-center" 
                    style={{
                        color: '#97245A', 
                        transition: '0.3s', 
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        fontStyle: 'italic',   
                    }}>PG Details</h1>
                    <div className="row">
                        <div className="col-md-8">
                            {selectedPG ? (
                                <div>
                                    <div className="highlighted-fields">
                                        <p> <strong>Name:</strong> {selectedPG.name}</p>
                                        <p> <strong>Type of PG:</strong> {selectedPG.pgType} </p>
                                        <p> <strong>Address:</strong> {selectedPG.address}</p>
                                        <p> <strong>Contact:</strong> {selectedPG.contact} </p>
                                    </div>
                                    <div className="highlighted-fields">
                                        <p> <strong>Pricing Details:</strong> </p>
                                        {selectedPG.pricing && selectedPG.pricing.map((ele) => {
                                            return (
                                                <div key={ele._id}> Sharing: {ele.share} - Amount: {ele.amount} </div>
                                            )
                                        })}
                                    </div>
                                    <div className="highlighted-fields">
                                        <p> <strong>Facilities:</strong> </p>
                                        {selectedPG.facilities && selectedPG.facilities.map((ele) => {
                                            return (
                                                <div key={ele._id}>
                                                    <li> {ele} </li>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <p> <strong>Type of Food:</strong> {selectedPG.foodType} </p>
                                    <p> <strong>Near By Places:</strong> </p>
                                    {selectedPG.nearByPlaces && selectedPG.nearByPlaces.map((place) => {
                                        return (
                                            <div key={place._id}>
                                                Name: {place.name} - Distance: {place.distance}
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}

                            {/* Available Rooms Card */}
                            <div className="card mt-4">
                                <div className="card-header">
                                    <h2>Available Rooms</h2>
                                </div>
                                <div className="card-body" style={{ overflowY: "scroll", maxHeight: "400px" }}>
                                    {availableRoomsForResident.length === 0 ? <p>No rooms are available now</p> : availableRoomsForResident.map((room) => {
                                        return (
                                            <div key={room._id}>
                                                <li> Sharing: {room.sharing} - Room Number: {room.roomNumber} - Floor: {room.floor} </li>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Reviews Card */}
                            <div className="card mt-4">
                                <div className="card-header">
                                    <h2>Reviews</h2>
                                </div>
                                <div className="card-body" style={{ overflowY: "scroll", maxHeight: "400px" }}>
                                    {allReviewsForPG.length === 0 ? (
                                        <p>No reviews available for this PG.</p>
                                    ) : (
                                        <div>
                                            {allReviewsForPG.map((review) => (
                                                <div key={review._id}>
                                                    <li>
                                                        {review.review} -- {review.residentName}
                                                        <button className="icon-button" style={{ marginRight: '10px' }} onClick={() => handleReviewEdit(review._id)}>
                                                            <FaEdit style={{ color: "green" }} /> Edit
                                                        </button>
                                                        <button className="icon-button" onClick={() => handleReviewRemove(review._id)}>
                                                            <FaTrash style={{ color: "red" }} /> Remove
                                                        </button><br />
                                                        Food: {review.rating && review.rating.food} <br />
                                                        Safety: {review.rating && review.rating.safety} <br />
                                                        Hygienic: {review.rating && review.rating.hygienic} <br />
                                                        Facilities: {review.rating && review.rating.facilities} <br />
                                                    </li>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div> 
                        <div className="col-md-4">
                            <p> <strong> Images </strong> </p>
                            <Carousel autoPlay={true} interval={2000} infiniteLoop={true}>
                                {selectedPG.images && selectedPG.images.map((image, index) => (
                                    <div key={index} style={{ maxWidth: '400px', maxHeight: '400px' }}>
                                        <img
                                            src = {image}
                                            alt={`PGImage ${index+1}`}
                                            style={{ maxWidth: '150%', maxHeight: '150%' }}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                            <hr />
                            {!showAddReview && (
                                <button style={{
                                    margin: '5px',
                                    padding: '10px',
                                    backgroundColor: '#64B2E4',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px'
                                  }} onClick={() => setShowAddReview(true)}>Add Review</button>
                            )}
                            {showAddReview && <AddReview handleCancel={handleCancel} pgDetailsId={pgDetailsId} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowPG