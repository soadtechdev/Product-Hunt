import React, { useState } from "react";
import styled from "@emotion/styled";
import Router from "next/router";
import { css } from "@emotion/core";

const InputText = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
  margin-left: 2rem;
`;
const InputSumit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url("/static/img/buscar.png");
  background-repeat: no-repeat;
  position: absolute;
  top: 1px;
  right: 1rem;
  background-color: white;
  border: none;
  text-indent: -9999px;

  &:hover {
    cursor: pointer;
  }
`;

const Buscar = () => {
  const [busqueda, setBusqueda] = useState("");

  const buscarProducto = (e) => {
    e.preventDefault();

    if (busqueda.trim() === "") return;

    //redireccionar al user
    Router.push({
      pathname: "/buscar",
      query: { q: busqueda },
    });
  };
  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={buscarProducto}
    >
      <InputText
        type="text"
        placeholder="Buscar Productos"
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <InputSumit type="submit">Buscar</InputSumit>
    </form>
  );
};

export default Buscar;
