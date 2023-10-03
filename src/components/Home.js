import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import image1 from '../images/image1.jpg'
import image2 from '../images/image2.jpeg'
import image3 from '../images/image3.jpg'
import image4 from '../images/image4.jpg'
import image5 from '../images/image5.jpeg'

const Home = (props) => {
  return (
    <div className="container">
      <h1 className="text-center mt-4" style={{color : '#CB1A80'}}> <i>Welcome to HomeNest</i></h1>
      <h5 className="mt-4">
        HomeNest serves as a versatile platform connecting PG owners and residents,
        facilitating a seamless accommodation search and management experience for both parties.
      </h5>

      <Carousel
        showArrows={true}
        infiniteLoop
        autoPlay
        showThumbs={false} // Remove thumbnail images
        stopOnHover={true} // Stop autoPlay on hover
      >
        {[
          { src: image1, alt: "Image 1" },
          { src: image2, alt: "Image 2" },
          { src: image3, alt: "Image 3" },
          { src: image4, alt: "Image 4" },
          { src: image5, alt: "Image 5" },
        ].map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} height='500px' width='200px' />
          </div>
        ))}
      </Carousel>
      <div className="row">
        <div className="col-md-6">
          <h2>For PG Owners:</h2>
          <p>If you register as a PG owner, you can enjoy the benefits of a centralized platform for managing your PG accommodations and residents.</p>
          <ul>
            <li>Centralized Management: HomeNest offers PG owners a centralized hub to efficiently manage their PG accommodations.</li>
            <li>Resident Management: Easily manage resident details, including their profiles, contact information, and more.</li>
            <li>Room Allocations: Streamline the process of allocating rooms to residents.</li>
            <li>Payment Management: Keep track of payments, dues, and financial transactions in one place.</li>
            <li>Review and Ratings: Monitor and respond to reviews and ratings from residents.</li>
            <li><h4>Features:</h4></li>
            <ul>
              <li>Add PG: Create new PG accommodation listings.</li>
              <li>Add Room: Add and manage room details within PGs.</li>
              <li>Add Residents: Easily onboard and manage resident profiles.</li>
              <li>Payment Reminders: Send payment reminders to residents.</li>
              <li>Access Reviews: View the reviews and average ratings from residents.</li>
            </ul>
          </ul>
        </div>
        <div className="col-md-6">
          <h2>For Users (Residents):</h2>
          <p>If you are looking for PG accommodation, registering as a PG resident on HomeNest provides the following benefits:</p>
          <ul>
            <li>Accommodation Search: Users can search for suitable accommodations near their workplace.</li>
            <li>Accommodation Listings: Access a variety of PG listings with detailed information and images.</li>
            <li>Payment Processing: Simplify payments for accommodation, ensuring a smooth experience.</li>
            <li>Review and Feedback: Share reviews and ratings based on their experience, helping others make informed decisions.</li>
            <li><h4>Features:</h4></li>
            <ul>
              <li>View All PGs: Browse through all available PG listings.</li>
              <li>Add Reviews: Provide feedback and ratings for the PGs where they are staying.</li>
              <li>See Reviews and Images: Access all reviews and images for every PG listing.</li>
              <li>Pay Rent: Conveniently pay rent using Razorpay payment system.</li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
