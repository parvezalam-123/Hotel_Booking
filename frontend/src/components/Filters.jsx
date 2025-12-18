import { useContext, useState } from "react";
import "./Filters.css"
import { IoStarSharp } from "react-icons/io5";
import { HotelDataProvider } from "../context/HotelsDataContext";
function Filters() {
    let locations = ["Gangtok", "Srinagar", "Jaipur", "Manali", "Gulmarg", "Shillong"];
    let allCategories = ["Resort", "Luxury", "Cottage", "5-Star", "Budget"];
    const currMinPrice = 0;
    const currMaxPrice = 100000;
    const [currPrice, setCurrPrice] = useState(currMaxPrice / 2);
    const { rating, destinations, categories, minPrice, maxPrice, handleCategoryChange, handleLocationChange,handleRatingChange,handlePriceChange } = useContext(HotelDataProvider);
    return (
        <div className="filters">
            <div className="filter-columns">
                <h1>Price Range</h1>
                <input type="range" className="price-range-slider" onChange={(e) => {
                    setCurrPrice(e.target.value * currMaxPrice / 100)
                    handlePriceChange(e.target.value * currMaxPrice / 100)
                }} />
                <div className="price-range">
                    <span>₹{currMinPrice}</span>
                    <span>₹{currPrice}</span>
                </div>
            </div>
            <div className="filter-columns">
                <h1>Ratings</h1>
                <div className="filter-column">
                    <div className="filter-options">
                        <input type="checkbox" checked={rating == 5} onChange={()=>handleRatingChange(5)} />
                        <label htmlFor="">
                            <div className="stars-conatiner">
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                            </div>
                            5</label>
                    </div>
                    <div className="filter-options">
                        <input type="checkbox" checked={rating == 4} onChange={()=>handleRatingChange(4)} />
                        <label htmlFor="">
                            <div className="stars-conatiner">
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                            </div>
                            4

                        </label>
                    </div>
                    <div className="filter-options">
                        <input type="checkbox" checked={rating == 3} onChange={()=>handleRatingChange(3)} />
                        <label htmlFor="">
                            <div className="stars-conatiner">
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                            </div>
                            3</label>
                    </div>
                </div>
            </div>
            <div className="filter-columns">
                <h1>Location</h1>
                <div className="filter-column">
                    {
                        locations.map((location, index) => {
                            return <div className="filter-options" key={index}>
                                <input type="checkbox" checked={destinations.includes((location.toLowerCase()))} onChange={() => { handleLocationChange(location.toLowerCase()) }} />
                                <label htmlFor="">{location}</label>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="filter-columns">
                <h1>Category</h1>
                <div className="filter-column">
                    {
                        allCategories.map((category, index) => {
                            return <div className="filter-options" key={index}>
                                <input type="checkbox" checked={categories.includes(category.toLowerCase())} onChange={() => { handleCategoryChange(category.toLowerCase()) }} />
                                <label htmlFor="">{category}</label>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="apply-filters">
                <button>Apply Filters</button>
            </div>
        </div>
    )
}

export default Filters