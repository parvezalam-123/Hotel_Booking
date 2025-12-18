import { createContext, useState } from "react"
import api from "../api/api";

export const HotelDetailsDataProvider = createContext();
function HotelDetailsContext({ children }) {
    const [isPopupOpen, setIsPopUpOpen] = useState(false);
    const [currBookingDetails, setCurrBookingDetails] = useState(null);
    const [userBookingData, setUserBookingData] = useState({
        user_id: "",
        hotel_id: "",
        room_id: "",
        check_in_date: "",
        check_out_date: "",
        number_of_guests: "",
        total_amount: "",
        tax_amount: "",
        final_amount: "",
        card_details: { holder_name: "", card_number: "", expiry_date: "", cvv: "" },
        special_requests: "",
        cancellation_reason: "",
        alternate_phone_number: ""
    });
    function handleChange(e) {
        const label = e.target.name; //special_requests
        const value = e.target.value; //value1
        if (label == "holder_name" || label == "card_number" || label == "cvv") {
            setUserBookingData({ ...userBookingData, card_details: { ...userBookingData.card_details, [label]: value } })
        }
        else {
            setUserBookingData({ ...userBookingData, [label]: value });
        }
    }

    async function bookHotel() {
        try {
            const res = await api.post("/bookings", userBookingData);
            if (res.status == 201) {
                alert("Hotel Booked");
            }
        }
        catch (err) {
            console.log(err);
            alert(err?.response?.data?.message);
        }
    }
    return (
        <HotelDetailsDataProvider.Provider value={{ isPopupOpen, setIsPopUpOpen, currBookingDetails, setCurrBookingDetails, userBookingData, setUserBookingData, handleChange, bookHotel }}>
            {children}
        </HotelDetailsDataProvider.Provider>
    )
}

export default HotelDetailsContext;