import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviews } from "../../redux/actions/reviewsActions";
import { FaStar } from "react-icons/fa";
import "./Reviews.css";
function Reviews() {
  const reviews = useSelector((state) => state.reviews.reviews);
  console.log(reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getReviews());
    };
    fetchData();
  }, [dispatch]);

  const renderStars = (score) => {
    const normalizedScore = Math.min(score, 5);
    const totalStars = 5;
    const fullStars = Math.floor(normalizedScore);
    const halfStar = normalizedScore - fullStars >= 0.5 ? true : false;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }

    if (halfStar) {
      stars.push(<FaStarHalf key="half" />);
    }

    for (let i = 0; i < emptyStars.length; i++) {
      stars.push(<FaStar key={i} color="#c0c0c0" />);
    }
    return stars;
  };

  const [sliceIndex, setSliceIndex] = useState(0);
  const reviewsPerPage = 3;
  const handleNext = () => {
    setSliceIndex(sliceIndex + reviewsPerPage);
  };
  const handlePrev = () => {
    setSliceIndex(sliceIndex - reviewsPerPage);
  };

  return (
    <div className="reviews">
      <h2 style={{ fontSize: "50px", color: "white" }}>Reviews</h2>
      {reviews.length > 0 ? (
        <>
          <div className="card-container">
            {reviews
              .slice(sliceIndex, sliceIndex + reviewsPerPage)
              .map((review) => (
                <article className="card" key={review.id}>
                  <div className="card-header">
                    <div className="card-score">
                      <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                        Valoracion: {renderStars(review.score)}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    
                    <span style={{ fontWeight: "700", fontSize: "20px", color: "white" }}>
                      Reseña de {review.user.name} {review.user.lastName}:{" "}
                    </span>
                    <br />

                    <p className="card-text">"{review.text}"</p>
                  </div>
                </article>
              ))}
          </div>
          <div className="pagination">
            {sliceIndex > 0 && (
              <button className="prev-btn" onClick={handlePrev}>
                Anterior
              </button>
            )}
            {sliceIndex + reviewsPerPage < reviews.length && (
              <button className="next-btn" onClick={handleNext}>
                Siguiente
              </button>
            )}
          </div>
        </>
      ) : (
        <p>No hay reviews disponibles</p>
      )}
    </div>
  );
}

export default Reviews;
