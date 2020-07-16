import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout/Layout";
import { FirebaseContext } from "../../server";
import Error404 from "../../components/layout/404";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Campo, InputSubmit } from "../../components/UI/Formulario";
import Boton from "../../components/UI/Boton";

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;
const Producto = () => {
  //state del component
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);

  //sacando el id de la URL
  const router = useRouter();

  const {
    query: { id },
  } = router;

  //context
  const { firebase } = useContext(FirebaseContext);

  //peticion
  useEffect(() => {
    if (id) {
      const obtenenerProducto = async () => {
        try {
          const productoQuery = await firebase.db
            .collection("productos")
            .doc(id);
          const producto = await productoQuery.get();

          if (producto.exists) {
            setProducto(producto.data());
            setError(false);
          } else {
            setError(true);
          }
        } catch (error) {
          console.log(error);
        }
      };
      obtenenerProducto();
    }
  }, [id]);

  //   if (Object.keys(producto).length === 0) return "Cargando...";

  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    votos,
    creador,
  } = producto;
  if (Object.keys(producto).length === 0) {
    return (
      <Layout>
        <p>Cargando...</p>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <>
          {error && <Error404 />}
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {nombre}
            </h1>

            <ContenedorProducto>
              <div>
                <p>
                  Escrito por : {creador.nombre} de {empresa}
                </p>

                <img src={urlimagen} alt={nombre} />
                <p>{descripcion}</p>

                <h2>Agrega tu comentario</h2>
                <form action="">
                  <Campo>
                    <input type="text" name="mensaje" />
                  </Campo>
                  <InputSubmit type="submit" value="Agregar Comentario" />
                </form>

                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>
                {/* {comentarios.map((comentario) => (
                  <li>
                    <p>{comentario.nombre}</p>
                  </li>
                ))} */}
              </div>
              <aside>
                <p>
                  Publicado hace:{" "}
                  {formatDistanceToNow(new Date(creado), { locale: es })}
                </p>
                <Boton target="_blank" bgColor="true" href={url}>
                  Visitar URL
                </Boton>
                <p>{votos} Votos</p>
                <Boton>Votar</Boton>
              </aside>
            </ContenedorProducto>
          </div>
        </>
      </Layout>
    );
  }
};

export default Producto;
