import { useContext } from "react"
import { HotelDetailsDataProvider } from "../../context/HotelDetailsContext"

function PaymentSection() {
    const { userBookingData, setUserBookingData, handleChange } = useContext(HotelDetailsDataProvider)
    return (
        <div className="pop-up-form">
            <form>
                <div className="form-column">
                    <label htmlFor="holder_name">Holder Name</label>
                    <input type="text" value={userBookingData.card_details.holder_name} name="holder_name" id="holder_name" onChange={handleChange} />
                </div>
                <div className="form-column">
                    <label htmlFor="card_number">Card Number</label>
                    <input type="number" value={userBookingData.card_details.card_number} name="card_number" id="card_number" onChange={handleChange} />
                </div>
                <div className="form-column">
                    <label htmlFor="expiry_date">Expiry Date</label>
                    <input type="date" value={userBookingData.card_details.expiry_date} name="expiry_date" id="expiry_date" onChange={handleChange} />
                </div>
                <div className="form-column">
                    <label htmlFor="cvv">CVV Number</label>
                    <input type="number" value={userBookingData.card_details.cvv} name="cvv" id="cvv" onChange={handleChange} />
                </div>
            </form>
        </div>
    )
}

export default PaymentSection