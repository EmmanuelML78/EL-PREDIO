import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import isEmail from "validator/lib/isEmail";
import isAlpha from "validator/lib/isAlpha";
import { setUser } from "../../redux/actions/authActions";
import { putUser } from "../../redux/actions/userActions";
import Loading from "../Loading/Loading.jsx";
import { ToastContainer, toast } from "react-toastify";
import s from "./Profile.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { FaEnvelope, FaIdCard, FaPhone } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [valuesLoading, setValuesLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await dispatch(setUser());
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, user]);

  const initialValues = user && {
    email: user.email,
    name: user.name,
    lastName: user.lastName,
    phone: user.phone,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .test("isEmail", "Correo electrónico inválido", (value) => isEmail(value))
      .required("Requerido"),
    name: Yup.string()
      .test("isAlpha", "Nombre inválido", (value) => isAlpha(value))
      .required("Requerido"),
    lastName: Yup.string()
      .test("isAlpha", "Nombre inválido", (value) => isAlpha(value))
      .required("Requerido"),
    phone: Yup.string()
      .nullable(true)
      .matches(/^[0-9]+$/, "Solo números"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { email, name, lastName, phone } = values;
      try {
        const response = await dispatch(
          putUser(user.id, { email, name, lastName, phone })
        );
        console.log("response:", response);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleSave = async () => {
    try {
      await formik.handleSubmit();
      useEffect(() => {
        dispatch(setUser());
      });
      setIsEditing(false);
    } catch (error) {
      console.log("error:", JSON.stringify(formik.errors));
      JSON.stringify(formik.errors) === "{}"
        ? (toast.success("Se editó la información correctamente!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          }),
          setIsEditing(false))
        : toast.error(`${Object.values(formik.errors)}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });

      console.log(formik.errors);
    }
  };

  return isLoading ? (
    <Loading />
  ) : !user ? (
    history.push("/login")
  ) : (
    user && (
      <>
        <Navbar />
        <ToastContainer />
        <div className={s.profileContainer}>
          <h1 style={{ margin: "0 auto" }}>Perfil de usuario</h1>
          {!isEditing ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                placeItems: "start",
              }}
            >
              <p>
                <FaIdCard style={{ marginRight: "1rem" }} />{" "}
                {user.name + " " + user.lastName}
              </p>
              <p>
                <FaEnvelope style={{ marginRight: "1rem" }} /> {user.email}
              </p>
              <p>
                {" "}
                <FaPhone style={{ marginRight: "1rem" }} />
                {user.phone
                  ? user.phone
                  : "No se añadió ningun número de telefóno"}
              </p>
            </div>
          ) : (
            user && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  placeItems: "start",
                }}
              >
                <input
                  className={s.inputs}
                  type="text"
                  id="name"
                  name="name"
                  // value={user.name}
                  placeholder="Nombre"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={user && formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <div style={{ margin: "0" }}>{formik.errors.name}</div>
                )}
                <input
                  className={s.inputs}
                  type="text"
                  id="lastName"
                  name="lastName"
                  // value={user.lastName}
                  placeholder="Apellido"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={user && formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div style={{ margin: "0" }}>{formik.errors.lastName}</div>
                )}
                <input
                  className={s.inputs}
                  type="email"
                  id="email"
                  name="email"
                  // value={user.email}
                  placeholder="Correo electrónico"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={user && formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ margin: "0" }}>{formik.errors.email}</div>
                )}
                <input
                  className={s.inputs}
                  type="tel"
                  id="phone"
                  name="phone"
                  // value={user.phone}
                  placeholder="Ej: 1123934043"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={user && formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div style={{ margin: "0" }}>{formik.errors.phone}</div>
                )}
              </div>
            )
          )}
          <div>
            {isEditing ? (
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--verde-medio)",
                }}
                onClick={handleSave}
              >
                Guardar
              </button>
            ) : null}
            {isEditing ? (
              <button
                style={{ backgroundColor: "darkred", margin: "0 1rem" }}
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            ) : (
              <button
                style={{
                  marginRight: "1rem",
                }}
                onClick={() => setIsEditing(true)}
              >
                Editar perfil
              </button>
            )}
            {!isEditing && (
              <>
                <button onClick={() => setChangingPassword(true)}>
                  Cambiar contraseña
                </button>
                {changingPassword && (
                  <button
                    style={{ backgroundColor: "darkred", margin: "0 1rem" }}
                    onClick={() => setChangingPassword(false)}
                  >
                    Cancelar
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <Footer />
      </>
    )
  );
};

export default Profile;
