import { useContext, useState } from "react";
import "./BookHotelPopUp.css";
import { HotelDetailsDataProvider } from "../context/HotelDetailsContext";
import PersonalSection from "./Pop-Up-Sections/PersonalSection";
import StayDetailsSections from "./Pop-Up-Sections/StayDetailsSections";
import PaymentSection from "./Pop-Up-Sections/PaymentSection";

function BookHotelPopUp() {
    const { setIsPopUpOpen, currBookingDetails,bookHotel } = useContext(HotelDetailsDataProvider);
    const sections = [<PersonalSection />, <StayDetailsSections />, <PaymentSection />];
    const [currentSection, setCurrentSections] = useState(0);
    const hotel = currBookingDetails?.hotel;
    const room = hotel?.rooms[currBookingDetails?.roomIndex];
    function handleNextClick() {
        if (currentSection != sections.length - 1) {
            setCurrentSections(currentSection + 1)
        }
        else{
            bookHotel()
        }
    }
    function handlePrevClick() {
        if (currentSection != 0) {
            setCurrentSections(currentSection - 1)
        }
    }

    return (
        <div className="book-hotel-pop-up" onClick={() => {
            setIsPopUpOpen(false)
        }}>
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="pop-up-main">
                <div className="left-panel">
                    <div className="booking-hotel-name">
                        <h2>{currBookingDetails?.hotel?.name}</h2>
                    <p>{currBookingDetails?.hotel?.address}</p>
                    </div>
                    <div className="booking-room-details">
                        <h3>{room.name}</h3>
                        <p>{room.description}</p>
                        <p className="capacity"><span>Capacity: </span>
                        <span>{room?.capacity}</span>
                        </p>
                    </div>
                    <div className="booking-room-price">
                        <div className="price-per-night">
                            <span>Room Price (per night)</span>
                            <span>₹{room.base_price}</span>
                        </div>
                        <div className="tax">
                            <span>Tax (18%)</span>
                            <span>₹{room.base_price*18/100}</span>
                        </div>
                        <div className="total">
                            <span>Total Amount</span>
                            <span>₹{room.base_price*1.18}</span>
                        </div>
                    </div>
                </div>
                <div className="right-panel">

                    <div className="section-header-main">
                        <div className="section-header">
                            {
                                new Array(3).fill(0).map((_, ix) => {
                                    return <div className={`section ${currentSection == ix && "active"}`} key={ix}><span>{ix + 1}</span></div>
                                })
                            }
                        </div>
                        <div className="section-header-labels">
                            <div className="header-label">Personal Details</div>
                            <div className="header-label">Stay Details</div>
                            <div className="header-label">Payment</div>

                        </div>
                    </div>

                    {/* Form  */}
                    {
                        sections[currentSection]
                    }

                    {/* Pop up footer code  */}
                    <div className="pop-up-footer">
                        <div className="prev-btn">
                            <button onClick={handlePrevClick}>Previous</button>
                        </div>
                        <div className="next-btn">
                            <button onClick={handleNextClick}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookHotelPopUp;