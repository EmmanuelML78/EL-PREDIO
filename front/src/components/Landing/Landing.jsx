import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import isEmail from "validator/lib/isEmail";
import isAlpha from "validator/lib/isAlpha";
import g from "./../../assets/google logo.svg";
import "./Landing.css";
import { postUser } from "../../redux/actions/userActions";
import { loginUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../redux/actions/authActions";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import instance from "../../redux/axiosCfg";

const Landing = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  const [isRegistering, setIsRegistering] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      user;
      if (!user) {
        await dispatch(setUser());
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, user]);

  const initialValues = {
    email: "",
    password: "",
    name: "",
    lastName: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .test("isEmail", "Correo electrónico inválido", (value) => isEmail(value))
      .required("Requerido"),
    password:
      isRegistering &&
      Yup.string()
        .min(8, "Mínimo 8 caracteres")
        .max(20, "Máximo 20 caracteres")
        .matches(/[a-zA-Z]/, "Debe contener al menos una letra")
        .matches(/\d/, "Debe contener al menos un número")
        .required("Requerido"),
    name:
      isRegistering &&
      Yup.string()
        .test("isAlpha", "Solo caracteres alfabéticos", (value) =>
          isAlpha(value)
        )
        .required("Requerido"),
    lastName:
      isRegistering &&
      Yup.string()
        .test("isAlpha", "Solo caracteres alfabéticos", (value) =>
          isAlpha(value)
        )
        .required("Requerido"),
    confirmPassword:
      isRegistering &&
      Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Requerido"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!isRegistering) {
        const { email, password } = values;

        try {
          const response = await dispatch(loginUser({ email, password }));
          const token = response.data.token;

          localStorage.setItem("token", token);
          toast.success("Sesión iniciada exitosamente!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          window.location.href = "/";
          // goHome()
        } catch (error) {
          toast.error("El correo y/o la contraseña no son correctos", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        }
      } else if (isRegistering) {
        const { email, password, name, lastName } = values;
        try {
          await dispatch(postUser({ email, password, name, lastName }));
          toast.success("Usuario creado exitosamente! Inicie sesión", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          setIsRegistering(false);
        } catch (error) {
          if (error.response.status === 500) {
            toast.error("El correo electrónico ya está registrado", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            });
          }
        }
      }
    },
  });

  const handleRegisterClick = () => {
    isRegistering ? setIsRegistering(false) : setIsRegistering(true);
  };
  const history = useHistory();
  const goHome = () => {
    history.push("/home");
  };
  const handleGoogleLogin = () => {
    window.location.href = instance.defaults.baseURL + "google";
  };

  return (
    <div className="container">
      <ToastContainer />
      {isLoading ? (
        <Loading />
      ) : user ? (
        goHome()
      ) : (
        <form className="form" onSubmit={formik.handleSubmit}>
          <h1>El Predio</h1>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={
              formik.touched.email && formik.errors.email ? "error" : ""
            }
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
          <>
            {isRegistering && (
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                onChange={(e) => {
                  formik.setFieldValue(
                    "name",
                    (
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                    ).trim()
                  );
                }}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={
                  formik.touched.name && formik.errors.name ? "error" : ""
                }
              />
            )}
            {isRegistering && formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
            {isRegistering && (
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                onChange={(e) => {
                  formik.setFieldValue(
                    "lastName",
                    (
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                    ).trim()
                  );
                }}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className={
                  formik.touched.lastName && formik.errors.lastName
                    ? "error"
                    : ""
                }
              />
            )}
            {isRegistering &&
              formik.touched.lastName &&
              formik.errors.lastName && (
                <div className="error">{formik.errors.lastName}</div>
              )}
          </>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
          />
          {isRegistering &&
            formik.touched.password &&
            formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          {isRegistering && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "error"
                  : ""
              }
            />
          )}
          {isRegistering &&
            formik.touched.confirmPassword &&
            formik.errors.confirmPassword && (
              <div className="error">{formik.errors.confirmPassword}</div>
            )}

          <p className="switch" type="button" onClick={handleRegisterClick}>
            {isRegistering ? "Ya tengo cuenta" : "Crear cuenta"}
          </p>
          <button onClick={formik.handleSubmit} type="submit">
            {isRegistering ? "Registrarse" : "Iniciar sesión"}
          </button>
          <button
            style={{ backgroundColor: "white" }}
            className="google"
            type="button"
            onClick={handleGoogleLogin}>
            <img
              style={{ height: "2rem", marginRight: "1rem" }}
              src={g}
              alt=""
            />
            <p>Iniciar sesión con Google</p>
          </button>
        </form>
      )}
    </div>
  );
};

export default Landing;
