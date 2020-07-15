import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Router from "next/router";
import { css } from "@emotion/core";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/UI/Formulario";
import firebase from "../server/firebase";

import useValidacion from "../hooks/useValidacion";
import validarLogin from "../validacion/validarLogin";

const Login = () => {
  const [error, setError] = useState(false);

  const STATE_INICIAL = {
    email: "",
    password: "",
  };
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarLogin, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.error("Hubo un error al iniciar sesion", error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Iniciar sesion
          </h1>
          <Formulario onSubmit={handleSubmit}>
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Tu email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}
            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                placeholder="Tu password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Iniciar Sesion" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login;
