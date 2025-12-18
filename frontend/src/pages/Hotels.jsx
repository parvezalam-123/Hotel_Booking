import HotelsHero from "../components/HotelsHero";
import SearchBox from "../components/SearchBox";
import hotelsData from "../assets/hotels";
import HotelCard from "../components/HotelCard";
import "./Hotels.css"
import Filters from "../components/Filters";
import { useContext } from "react";
import { HotelDataProvider } from "../context/HotelsDataContext";
function Hotels() {
    const { hotels, page,pagination } = useContext(HotelDataProvider);
    let pages = pagination?.totalPages;
    let currentPage = pagination?.page;
    return (
        <>
            <HotelsHero />
            <SearchBox />
            <main className="hotels-main-container">
                <Filters />
                <div className="hotels-grid-container">
                    <div className="hotels-header">
                        <h2 className="number-of-hotels">{pagination?.total} Results Found</h2>
                        <div className="hotels-sort">
                            <label htmlFor="sort-hotels">Sort Hotels</label>
                            <select className="sort-hotels">
                                <option>Option</option>
                                <option>Option</option>
                                <option>Option</option>
                                <option>Option</option>
                            </select>
                        </div>
                    </div>

                    <div className="hotels-card-container">
                        {
                            hotels.map((hotel, index) => {
                                return <HotelCard data={hotel} key={index} />
                            })
                        }
                    </div>

                    <div className="hotels-pagination">
                        {
                            new Array(pages).fill(0).map((el, ix) => {
                                return <button key={ix} className={`${ix == 0 && "active-btn"}`}>{ix + 1}</button>
                            })
                        }
                        <div className="next-btn">Next</div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Hotels;