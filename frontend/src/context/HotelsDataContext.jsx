import { createContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import api from '../api/api';

export const HotelDataProvider = createContext();
function HotelsDataContext({ children }) {
    const [hotels, setHotels] = useState([]);
    const [pagination, setPagination] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    async function getHotels() {
        try {
            const res = await api.get(`/hotels/hotels?${searchParams.toString()}`);
            if (res.status == 200) {
                setHotels(res?.data?.data?.hotels);
                setPagination(res?.data?.data?.pagination);
                setLoading(false);
            }
        }
        catch (err) {
            alert(err?.response?.data?.message || "Internal Server Error");
            console.log(err);
        }
    }
    useEffect(() => {
        getHotels();
    }, [searchParams])

    let page = searchParams.get("page") || 1;
    let rating = searchParams.get("rating") || "";
    let destinations = searchParams.getAll("destination") || [];
    let categories = searchParams.getAll("category") || [];
    let checkIn = searchParams.get("checkIn");
    let checkOut = searchParams.get("checkOut");
    let minPrice = searchParams.get("minPrice") || 0;
    let maxPrice = searchParams.get("maxPrice") || 50000;

    function handleLocationChange(location) {
        if (destinations.includes(location)) {
            destinations = destinations.filter((loc) => loc != location)
        }
        else {
            destinations.push(location);
        }
        searchParams.delete("destination")
        destinations.forEach((destination) => {
            searchParams.append("destination", destination)
        })
        setSearchParams(searchParams);
    }

    function handleCategoryChange(category) {
        if (categories.includes(category)) {
            categories = categories.filter((cat) => cat != category);
        }
        else {
            categories.push(category);
        }
        searchParams.delete("category");
        categories.forEach((cat) => {
            searchParams.append("category", cat);
        })
        setSearchParams(searchParams);
    }

    function handleRatingChange(newRating) {
        if (rating == newRating) {
            searchParams.delete("rating");
        }
        else {
            searchParams.set("rating", newRating)
        }
        setSearchParams(searchParams)
    }
    function handlePriceChange(newPrice){
        searchParams.set("maxPrice",newPrice);
        setSearchParams(searchParams);
    }
    return (
        <HotelDataProvider.Provider value={{ hotels, setHotels, page, rating, destinations, categories, minPrice, maxPrice, pagination, handleCategoryChange, handleLocationChange, handleRatingChange, handlePriceChange }}>
            {loading ? <h1>Loading...</h1> : children}
        </HotelDataProvider.Provider>
    )
}

export default HotelsDataContext;