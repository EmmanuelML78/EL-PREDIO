import { useState, useEffect } from "react";
import { postReviews } from "../../redux/actions/reviewsActions";
import { setUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "./CreadorReviews.css";

function CreadorReviews() {
  const [score, setScore] = useState("");
  const [text, setText] = useState("");
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(setUser(user));
    };
    fetchData();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="reviews-card">
      <form onSubmit={handleSubmit}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            color: "green",
            fontWeight: "300",
          }}
        >
          Crea Tu Review
        </h1>
        <label
          htmlFor="score"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Puntuación:
        </label>
        <select
          name="score"
          id="score"
          value={score}
          style={{ fontSize: "20px", width: "35px", color: "white" }}
          onChange={(event) => setScore(event.target.value)}
        >
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <label
          htmlFor="text"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Texto:
        </label>
        <textarea
          name="text"
          id="text"
          rows="4"
          cols="50"
          style={{ color: "white" }}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <button
          type="submit"
          style={{ color: "white", backgroundColor: "red" }}
        >
          Enviar Review
        </button>
      </form>
    </div>
  );
}

export default CreadorReviews;
