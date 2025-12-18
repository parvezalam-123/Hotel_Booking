import "./MyBookings.css";
import demoBookingData from "../assets/demo_booking_details";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { UserDataContext } from "../context/UserContext"
function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const { user, loading } = useContext(UserDataContext);
    async function getData() {
        try {
            const res = await api.get(`/bookings/user/${user.id}`);
            setBookings(res?.data?.data);
        }
        catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || "Inernal Server Error");
        }
    }

    async function cancelBooking(id) {
        try {
            const res = await api.put(`/bookings/cancel/${id}`);
            if(res.status == 200){
                alert("Booking Cancelled");
            }
        }
        catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || "Inernal Server Error");
        }
    }
    useEffect(() => {
        if (!loading) {
            getData();
        }
    }, [loading])

    function getBookingAction(status,id) {
        if (status == "pending" || status == "confirmed") {
            return <div className="my-booking-action">
                <div className="my-booking-action-btn cancel-booking" onClick={()=>cancelBooking(id)}>
                    <span>Cancel Booking</span>
                </div>
            </div>
        }
        else if(status == "cancelled"){
            return <div className="my-booking-action">
                <div className="canceled-booking">
                    <span>Cancelled</span>
                </div>
            </div>
        }
        return <div className="my-booking-action">
            <div className="my-booking-action-btn write-review">
                <span>Write Review</span>
            </div>
        </div>
    }
    return (
        <section className="my-bookings-main">
            <div className="my-bookings-header">
                <div className="my-bookings-header-main">
                    <h2>My Bookings</h2>
                </div>

                <div className="my-bookings-filter">
                    <select>
                        <option>Select Bookings With Status</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                        <option>Accepted</option>
                        <option>Upcoming</option>
                    </select>
                </div>
            </div>

            <div className="my-bookings-container">
                {
                    bookings.map((data, index) => {
                        return <div className="my-booking-card" key={index}>
                            <div className="my-booking-card-header">
                                <div className="my-booking-hotel-name">
                                    <h2>{data?.hotel_id?.name}</h2>
                                    <div className="hotel-location">
                                        <span>{data?.hotel_id?.address}</span>
                                    </div>
                                </div>
                                <div className="booking-id">
                                    <span>Booking Id: {data?._id.substring(0, 8)}</span>
                                </div>
                            </div>
                            <div className="my-booking-card-info">
                                <div>
                                    <span>Check-In Date</span>
                                    <span>{data?.check_in_date}</span>
                                </div>
                                <div>
                                    <span>Check-Out Date</span>
                                    <span>{data?.check_out_date}</span>
                                </div>
                                <div>
                                    <span>Book Date</span>
                                    <span>{data?.createdAt}</span>
                                </div>
                                <div>
                                    <span>Number Of Guests</span>
                                    <span>{data?.number_of_guests}</span>
                                </div>
                                <div>
                                    <span>Room Name</span>
                                    <span>{data?.room_id?.name}</span>
                                </div>
                                <div>
                                    <span>Payment Status</span>
                                    <span>{data?.payment_status}</span>
                                </div>
                            </div>
                            <div className="my-booking-card-footer">
                                <div className="my-booking-price">
                                    <span>{data?.final_amount}</span>
                                </div>
                                {getBookingAction(data?.status,data._id)}
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    )
}

export default MyBookings;