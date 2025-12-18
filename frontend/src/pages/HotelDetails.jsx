import { useParams } from "react-router-dom";
import "./HotelDetails.css";
import demoHotels from "../assets/demo_hotels_data";
import { useContext, useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { FaBed } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa";
import BookHotelPopUp from "../components/BookHotelPopUp";
import { UserDataContext } from "../context/UserContext";
import { HotelDetailsDataProvider } from "../context/HotelDetailsContext";
import api from "../api/api";

function HotelDetails() {
    const { id } = useParams();
    // const hotelData = demoHotels[0];
    const [hotelData, setHotelData] = useState({});
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserDataContext);
    const Image_Base_Url = import.meta.env.VITE_API_BASE_URL;
    async function getData() {
        try {
            const res = await api.get(`/hotels/hotel/${id}`);
            if (res.status == 200) {
                console.log(res.data.data)
                setHotelData(res?.data?.data);
                setLoading(false);
            }
        }
        catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || "Internal Server Error");
        }
    }
    useEffect(() => {
        getData();
    }, [])

    //hotel facts array
    const hotelFacts = [
        { key: "Contact Email", value: hotelData.contact_email },
        { key: "Contact Phone", value: hotelData.contact_phone },
        { key: "Check-In Time", value: hotelData.check_in_time },
        { key: "Check-Out Time", value: hotelData.check_out_time },
        { key: "Pets Allowed", value: hotelData?.policies?.pets ? "Yes" : "No" }
    ]

    function getBedNames(bed_types) {
        let ans = "";
        let arr = Object.entries(bed_types); //[["Kings",1],["Queen",1],["Twin",0]]
        for (let i of arr) {
            if (i[1] > 0) {
                ans += `${i[1]} ${i[0]} Bed + `
            }
        }
        ans = ans.substring(0, ans.length - 2);
        return ans;
    }

    // function that will run when user clicks on book room
    function handleRoomBook(roomData, roomIndex) {
        if (!user) {
            alert("Login to book hotel")
            return
        }
        setCurrBookingDetails({ hotel: hotelData, roomIndex: roomIndex })
        setIsPopUpOpen(true);
        console.log(roomData)
        setUserBookingData({
            ...userBookingData, user_id: user.id, hotel_id: hotelData._id, room_id: roomData._id,
            total_amount: roomData.base_price,
            tax_amount: roomData.base_price * 0.18,
            final_amount: roomData.base_price * 1.18
        })
    }
    const [selectedImage, setSelectedImage] = useState(0);
    const { isPopupOpen, setIsPopUpOpen, currBookingDetails, setCurrBookingDetails, setUserBookingData, userBookingData } = useContext(HotelDetailsDataProvider)
    if (loading) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            {/* Hotel Booking Pop Up Code  */}
            {isPopupOpen && <BookHotelPopUp />}

            <section className="hotel-details-main">
                <div className="hotel-details">
                    <div className="hotel-images">
                        <div className="main-image">
                            <img src={Image_Base_Url + hotelData?.images[selectedImage]} alt="" />
                        </div>
                        <div className="images-card-container">
                            {
                                hotelData?.images?.map((hotelImage, index) => {
                                    return <div className={`image-card ${index == selectedImage && "selected"}`} key={index} onClick={() => { setSelectedImage(index) }}>
                                        <img src={Image_Base_Url + hotelImage} alt="" />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="hotel-content">
                        <h1>{hotelData.name}</h1>
                        <div className="hotel-location">
                            <span>{hotelData.address}</span>
                        </div>
                        <div className="hotel-ratings">
                            <span>{hotelData.star_rating}</span>
                            <div className="stars">
                                {
                                    new Array(hotelData.star_rating).fill(0).map((_, index) => {
                                        return <IoStarSharp key={index} className="star" />
                                    })
                                }
                            </div>
                        </div>
                        <div className="hotel-price">
                            ₹{hotelData.price}
                        </div>
                        <div className="hotel-description">
                            <p>{hotelData.description}</p>
                        </div>
                        <div className="hotel-booking-btn">
                            <button>Book Now</button>
                        </div>
                    </div>
                </div>

                <div className="hotel-facts">
                    <h2>Hotel Facts</h2>
                    {
                        hotelFacts.map((fact, index) => {
                            return <div className="hotel-fact" key={index} style={{ borderBottom: index == hotelFacts.length - 1 && "none" }}>
                                <span>{fact.key}</span>
                                <span>{fact.value}</span>
                            </div>
                        })
                    }
                </div>

                <div className="rooms-container">
                    <h2>Avialable Rooms</h2>
                    <div className="rooms-grid">
                        {
                            hotelData?.rooms?.map((roomData, index) => {
                                return <div className="room-card" key={index}>
                                    <div className="room-image">
                                        <img src={Image_Base_Url + roomData.image} alt="" />
                                    </div>
                                    <div className="room-details">
                                        <div className="room-header">
                                            <h3>{roomData?.name}</h3>
                                            <div className="room-info">
                                                <div>
                                                    <span><LuUsers /></span>
                                                    <span>{roomData.capacity} Adults</span>
                                                </div>
                                                <div>
                                                    <span><FaBed /></span>
                                                    <span>
                                                        {
                                                            getBedNames(roomData.bed_type)
                                                        }
                                                    </span>
                                                </div>
                                                <div>
                                                    <span><FaRegMap /></span>
                                                    <span>{roomData.size_sqft} sq feet</span>
                                                </div>
                                            </div>
                                            <div className="room-description">
                                                {roomData.description}
                                            </div>
                                        </div>
                                        <div className="room-footer">
                                            <div className="room-price"><span>₹{roomData.base_price}</span>
                                                <span>/ night</span>
                                            </div>
                                            <div className="room-book-btn">
                                                <button onClick={() => {
                                                    handleRoomBook(roomData, index)
                                                }}>Book</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default HotelDetails