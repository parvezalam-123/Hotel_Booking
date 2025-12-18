import "./Hero.css";
function Hero() {
    return (
        <section id="hero">
            <div id="hero-content">
                <h1>Book Your Next Destination</h1>
                <p>Book luxury hotels and resorts all over the world</p>
                <div id="search-box">
                    <div>
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" placeholder="Enter Location" />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date"/>
                    </div>
                    <div>
                        <label htmlFor="npeople">Number of People</label>
                        <input type="number" id="npeople" />
                    </div>
                    <div id="search-btn">
                        <button>Search</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;