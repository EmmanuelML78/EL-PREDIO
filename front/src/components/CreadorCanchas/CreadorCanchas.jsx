import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCancha } from "../../redux/actions/canchaActions";
import validator from "validator";
import "./CreadorCanchas.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { FontStyle } from "@cloudinary/url-gen/qualifiers";
const CreadorCanchas = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    open: "",
    close: "",
    hasPromo: false,
    description: "",
    availability: true,
    grass: "",
    players: "",
  });

  const showWidget = () => {
    const widgetOptions = {
      cloudName: "ddyk63iig",
      apiKey: "997972759344332",
      api_secret: "l2z2jeoHRkh7W04MkawTA46IDZU",
      uploadPreset: "tw1pqje3",
      resourceType: "image",
      multiple: false,
    };
    window.cloudinary.openUploadWidget(widgetOptions, (error, result) => {
      if (!error && result && result.event === "success") {
        handleChange("image", result.info.secure_url);
        const cldImgInstance = new CloudinaryImage(result.info.public_id, {
          cloudName: "ddyk63iig",
        });
        setImageUrl(cldImgInstance);
      }
    });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    validateForm(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.keys(formErrors).length === 0 &&
      formErrors.constructor === Object
    ) {
      try {
        dispatch(postCancha(formData));
        setFormData({
          name: "",
          image: "",
          price: "",
          open: "",
          close: "",
          hasPromo: false,
          description: "",
          availability: null,
          grass: "",
          players: "",
        });
        toast.success("Cancha creada correctamente");
        history.push("/dashboard");
      } catch (error) {
        console.error(error);
        toast.error("Ha ocurrrido un error al crear la cancha");
      }
    } else {
      toast.error("Error: El formulario tiene errores");
    }
  };

  const validateForm = (field, value) => {
    const errors = { ...formErrors };

    switch (field) {
      case "name":
        if (!value || value.trim() === "") {
          errors.name = "El nombre es obligatorio";
        } else {
          delete errors.name;
        }
        break;
      case "description":
        if (!value || value.trim() === "") {
          errors.description = "Llenar la descripcion es obligatorio";
        } else {
          delete errors.description;
        }
        break;

      case "grass":
        if (!value || value.trim() === "") {
          errors.grass = "El tipo de cesped es obligatorio de llenar";
        } else {
          delete errors.grass;
        }
        break;

      case "image":
        if (!value || !validator.isURL(value)) {
          errors.image = "La URL de la imagen no es válida";
        } else {
          delete errors.image;
        }
        break;

      case "price":
        if (!value || value < 0) {
          errors.price = "El precio es obligatorio ";
        } else {
          delete errors.price;
        }
        break;

      case "players":
        const acceptedPlayersValues = ["5", "7", "11"];
        if (!acceptedPlayersValues.includes(value)) {
          errors.players = "La cantidad de jugadores debe ser 5, 7 u 11";
        } else {
          delete errors.players;
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <ToastContainer />
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        required
      />
      {formErrors.name && <p className="error-message">{formErrors.name}</p>}
      {/* Imagen */}

      <label htmlFor="image">Imagen:</label>

      {formErrors.image && <p className="error-message">{formErrors.image}</p>}

      <button onClick={showWidget}>Subir imagen</button>

      {imageUrl && (
        <div>
          <AdvancedImage cldImg={imageUrl} style={{ width: "560px" }} />
        </div>
      )}

      {/* Precio */}
      <label htmlFor="price">Precio:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={(e) => handleChange("price", e.target.value)}
        required
      />
      {formErrors.price && <p className="error-message">{formErrors.price}</p>}
      {/* Hora apertura */}
      <label htmlFor="open">Hora de apertura:</label>
      <input
        type="time"
        id="open"
        name="open"
        value={formData.open}
        onChange={(e) => handleChange("open", e.target.value)}
        required
      />
      {/* Hora cierre */}
      <label htmlFor="close">Hora de cierre:</label>
      <input
        type="time"
        id="close"
        name="close"
        value={formData.close}
        onChange={(e) => handleChange("close", e.target.value)}
        required
      />

      {/* Promoción */}
      <label htmlFor="hasPromo">¿Tiene promoción?</label>
      <input
        type="checkbox"
        id="hasPromo"
        name="hasPromo"
        value={formData.hasPromo}
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* Descripción */}
      <label htmlFor="description">Descripción:</label>
      <textarea
        name="description"
        style={{ width: "30rem", height: "10rem" }}
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
      >
        Descripcion:
      </textarea>
      {formErrors.description && (
        <p className="error-message">{formErrors.description}</p>
      )}
      {/* Disponibilidad */}
      <label htmlFor="availability">Disponibilidad:</label>
      <select
        id="availability"
        name="availability"
        value={formData.availability}
        onChange={(e) =>
          setFormData({
            ...formData,
            availability: e.target.value === "true",
          })
        }
        style={{ width: "20rem", height: "4rem" }}
      >
        <option value="true">Disponible</option>
        <option value="false">No disponible</option>
      </select>
      {/* Tipo de césped */}
      <label htmlFor="grass">Tipo de césped:</label>
      <input
        type="text"
        id="grass"
        name="grass"
        value={formData.grass}
        onChange={(e) => handleChange("grass", e.target.value)}
      />
      {formErrors.grass && <p className="error-message">{formErrors.grass}</p>}
      {/* Cantidad de jugadores */}
      <label htmlFor="players">Players</label>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <label style={{ margin: "1rem", height: "20px", fontSize: "18px" }}>
          <input
            style={{
              appearance: "none",
              borderRadius:"50%",
              width: "20px",
              height:"20px",
              marginRight:"8px",
              backgroundColor: "rgb(118, 118, 118)"
            }}
            type="radio"
            name="players"
            value="5"
            checked={formData.players === "5"}
            onChange={(e) => handleChange("players", e.target.value)}
          />
          5
        </label>
        <label style={{ margin: "1rem", height: "20px", fontSize: "18px" }}>
          <input
            style={{
              appearance: "none",
              borderRadius:"50%",
              width: "20px",
              height:"20px",
              marginRight:"8px",
              backgroundColor: "rgb(118, 118, 118)"
            }}
            type="radio"
            name="players"
            value="7"
            checked={formData.players === "7"}
            onChange={(e) => handleChange("players", e.target.value)}
          />
          7
        </label>
        <label style={{ margin: "1rem", height: "20px", fontSize: "18px" }}>
          <input
            style={{
              appearance: "none",
              borderRadius:"50%",
              width: "20px",
              height:"20px",
              marginRight:"8px",
              backgroundColor: "rgb(118, 118, 118)"
            }}
            type="radio"
            name="players"
            value="11"
            checked={formData.players === "11"}
            onChange={(e) => handleChange("players", e.target.value)}
          />
          11
        </label>
      </div>

      {formErrors.players && (
        <p className="error-message">{formErrors.players}</p>
      )}
      <button style={{ backgroundColor: "#404040" }} type="submit">
        Crear Cancha
      </button>
    </form>
  );
};

export default CreadorCanchas;
