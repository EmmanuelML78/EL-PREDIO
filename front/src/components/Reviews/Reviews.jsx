import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviews } from "../../redux/actions/reviewsActions";
import { FaStar } from "react-icons/fa";
import "./Reviews.css";
import Loading from "../Loading/Loading";
function Reviews() {
  const reviews = useSelector((state) => state.reviews.reviews);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getReviews());
      setIsLoading(false);
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
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={i} style={{ color: "#0003" }} className="fas fa-star"></i>
      );
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
  console.log(reviews);

  return (
    <div className="reviews">
      <h2 style={{ fontSize: "50px", color: "#111", fontWeight: "600" }}>
        Reviews
      </h2>
      {isLoading ? (
        <Loading />
      ) : reviews.length > 0 ? (
        <>
          <div className="card-container">
            {reviews
              .slice(sliceIndex, sliceIndex + reviewsPerPage)
              .map((review) => (
                <article className="card-review" key={review.id}>
                  <p style={{fontWeight:"600"}}>{(review.user.name + " " + review.user.lastName).toUpperCase()}</p>
                  <div>{renderStars(review.score)}</div>
                  <p className="card-text">"{review.text}"</p>
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
        <p style={{ color: "white" }}>No hay reviews disponibles</p>
      )}
    </div>
  );
}

export default Reviews;
