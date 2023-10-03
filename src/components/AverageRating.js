import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap"
import { useParams } from "react-router-dom"
import ShowPGReviews from "./ShowPGReviews"
import StarRating from 'react-star-ratings'

const AverageRating = (props) => {
    const [showReviews, setShowReviews] = useState(false)
    const [averageRating, setAverageRating] = useState({})
    const [errorMessage, setErrorMessage] = useState("") // State variable for error message

    const {pgDetailsId} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3800/api/reviews-ratings/averageRating/${pgDetailsId}`, {
                    headers: {
                        "x-auth": localStorage.getItem("token"),
                    },
                })
                console.log("average-rating-res", response.data)

                // Check if the response contains an error message
                if (response.data.error) {
                    setErrorMessage(response.data.error) // Set the error message state
                } else {
                    setAverageRating(response.data) // Set average rating if no error
                }
            } catch (e) {
                alert(e.message)
            }
        }

        fetchData()
    }, [pgDetailsId])

    // Function to handle cancellation and show "Get Reviews" button again
    const handleCancel = () => {
        setShowReviews(false)
    }

    return (
        <div>
            <h3 className="mb-3 text-center" style={{ color: "#EE6C13" }}>Average Rating Details</h3>
            <h5 className="card-title text-center" style={{ color: "#9A32E7" }}>Overall Average Rating</h5> <br />
            <div className="card" style={{height:"35vh"}}>
                <div className="card-body text-center">
                    {errorMessage ? (
                        <p className="card-text">{errorMessage}</p> // Display error message if present
                    ) : (
                        <>
                            <StarRating
                                rating={averageRating.overallAverageRating}
                                starRatedColor="gold" // Customize the color of filled stars
                                numberOfStars={5} // Set the number of stars
                                starDimension="34px" // Set the size of stars
                                starSpacing="4px" // Add spacing between stars
                                name="rating"
                            />
                            <div className="card-text">
                                <p style={{ margin: 0 }}>Facilities: {averageRating.averageFacilitiesRating}</p>
                                <p style={{ margin: 0 }}>Food: {averageRating.averageFoodRating}</p>
                                <p style={{ margin: 0 }}>Hygienic: {averageRating.averageHygienicRating}</p>
                                <p style={{ margin: 0 }}>Safety: {averageRating.averageSafetyRating}</p>
                                <p style={{ margin: 0 }}>Overall Rating: {averageRating.overallAverageRating}</p>
                            </div>
                            {averageRating.overallAverageRating > 0 && ( // Conditionally render the button
                                <button style={{
                                    margin: '5px',
                                    padding: '10px',
                                    backgroundColor: '#5CBDB6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px'
                                }} onClick={() => setShowReviews(true)}>Get Reviews</button>
                            )}
                        </>
                    )}
                </div>
            </div>
            {showReviews && (
                <Offcanvas isOpen={showReviews} toggle={handleCancel}>
                    <OffcanvasHeader>
                        Reviews {""}
                        <Button color="danger" size="sm" onClick={handleCancel}>
                            Close
                        </Button>
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <ShowPGReviews handleCancel={handleCancel} pgDetailsId={pgDetailsId} />
                    </OffcanvasBody>
                </Offcanvas>
            )}
        </div>
    )
}

export default AverageRating
