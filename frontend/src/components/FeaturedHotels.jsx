import "./FeaturedHotels.css";
import HotelCard from "./HotelCard";

// Demo hotels data (will be removed after making backend)
import featuredHotels from "../assets/demo_hotels_data";
function FeaturedHotels() {
    return (
        <section id="featured-hotels">
            <h1>Featured Hotels</h1>
            <p>Find the best hotels across the world</p>
            <div id="hotels-grid">
                {
                    featuredHotels.map((hotelData, index) => {
                        return <HotelCard key={index} data={hotelData} />
                    })
                }
            </div>
        </section>
    )
}

export default FeaturedHotels;