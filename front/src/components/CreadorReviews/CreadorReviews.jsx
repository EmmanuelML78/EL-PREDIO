import { useState, useEffect } from "react";
import { postReviews, getReviews } from "../../redux/actions/reviewsActions";
import { setUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import s from "./CreadorReviews.module.css";
import { ToastContainer, toast } from "react-toastify";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";

function CreadorReviews({ reviewVisible, setReviewVisible }) {
  const [score, setScore] = useState(1);
  const [text, setText] = useState("");
  const user = useSelector((state) => state.auth.user);
  const reviews = useSelector((state) => state.reviews.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(setUser(user));
      await dispatch(getReviews());
    };
    fetchData();
  }, [dispatch]);
  const handleScore = (score) => {
    setScore(score);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userReviews = reviews.filter((review) => review.userId === user.id);
    if (userReviews.length > 0) {
      toast.error(
        "Ya has creado una review, No puedes ingresar mas de 1 Review.",
        {
          position: "bottom-right",
        }
      );
    } else {
      confirmAlert({
        title: "Agregar Review",
        message: "¿Está seguro que desea subir esta review?",
        buttons: [
          {
            label: "Agregar",
            onClick: async () => {
              const postData = { score: parseFloat(score), text };
              if (user) {
                postData.userId = user.id;
              }
              await dispatch(postReviews(postData));
              setReviewVisible(false);
            },
          },
          {
            label: "Cancelar",
            onClick: () => {},
          },
        ],
      });
      setScore("");
      setText("");
    }
  };

  return (
    <div
      className={s.reviewsCard}
      style={{ marginTop: "3rem", marginBottom: "3rem" }}
    >
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            fontWeight: "500",
          }}
        >
          Envía tu review 
        </h1>
        <Rating
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
          initialRating={score}
          onChange={handleScore}
          className={s.stars}
        />
        <textarea
          name="text"
          id="text"
          rows="4"
          cols="50"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className={s.textarea}
          maxLength={185}
          adju
        />

        <button
          type="submit"
          className={s.submit}
          style={{ backgroundColor: "#fff" }}
        >
          Enviar Review
        </button>
        <button
          onClick={() => setReviewVisible(false)}
          style={{ backgroundColor: "red", color: "white", margin: "10px" }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default CreadorReviews;
