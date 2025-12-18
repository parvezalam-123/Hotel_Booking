import "./CustomerReviews.css";
import reviews from "../assets/reviews";
function CustomerReviews() {
    return (
        <section id="reviews">
            <h1>Customers Reviews</h1>
            <p>Look what our previous customers said about us</p>
            <div id="reviews-container-grid">
                {
                    reviews.map((review, index) => {
                        return <div id="review-card" key={index}>
                            <div id="customer-img">
                                <img src={review.image} alt={review.name} />
                            </div>
                            <div id="customer-role">
                                <h4>{review.role}</h4>
                            </div>
                            <div id="customer-comment">
                                <p>{review.comment}</p>
                            </div>
                            <div id="customer-name">
                                <span>~{review.name}</span>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    )
}

export default CustomerReviews;