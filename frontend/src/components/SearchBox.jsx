import "./SearchBox.css";

function SearchBox() {
    return (
        <section className="search-box-conatiner">
            <div className="search-box">
                <div className="search-box-input-conatiner">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" />
                </div>
                <div className="search-box-input-conatiner">
                    <label htmlFor="check-in-date">Check-in date</label>
                    <input type="date" id="check-in-date" />
                </div>
                <div className="search-box-input-conatiner">
                    <label htmlFor="check-out-date">Check-out date</label>
                    <input type="date" id="check-out-date" />
                </div>
                <div className="search-box-input-conatiner">
                    <label htmlFor="number-of-people">Number of people</label>
                    <input type="number" id="number-of-people" />
                </div>
                <div className="search-box-button">
                    <button>Search</button>
                </div>
            </div>
        </section>
    )
}

export default SearchBox