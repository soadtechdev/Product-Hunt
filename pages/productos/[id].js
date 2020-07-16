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

const CreadorProducto = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

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
  const [comentario, setComentario] = useState({});
  const [consultarDB, setconsultarDB] = useState(true);

  //sacando el id de la URL
  const router = useRouter();

  const {
    query: { id },
  } = router;

  //context
  const { firebase, usuario } = useContext(FirebaseContext);

  //peticion
  useEffect(() => {
    if (id && consultarDB) {
      const obtenenerProducto = async () => {
        try {
          const productoQuery = await firebase.db
            .collection("productos")
            .doc(id);
          const producto = await productoQuery.get();

          if (producto.exists) {
            setProducto(producto.data());
            setError(false);
            setconsultarDB(false);
          } else {
            setError(true);
            setconsultarDB(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      obtenenerProducto();
    }
  }, [id, consultarDB]);

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
    haVotado,
  } = producto;

  //admionistrar votos
  const votarProducto = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos
    const nuevoTotal = votos + 1;

    //verificar si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) return;

    //guardar el id del usuario que ha votado
    const hanVotado = [...haVotado, usuario.uid];

    //actualizar los votos en la bd
    firebase.db
      .collection("productos")
      .doc(id)
      .update({ votos: nuevoTotal, haVotado: hanVotado });

    //actualizar el state
    setProducto({
      ...producto,
      votos: nuevoTotal,
    });

    setconsultarDB(true); //para que realize la consulta
  };

  //crear comentarios
  const comentarioChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  //identifica si el comentario es del creador
  const esCreador = (id) => {
    if (creador.id === id) {
      return true;
    }
  };
  const agregarComentario = (e) => {
    e.preventDefault();
    if (!usuario) {
      return router.push("/login");
    }

    //info extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    //tomar copia de comentarios y add al array
    const nuevosComentarios = [...comentarios, comentario];

    //actualizar la bd
    firebase.db.collection("productos").doc(id).update({
      comentarios: nuevosComentarios,
    });

    //actualizar state
    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });
    setconsultarDB(true);
  };

  //verificar que el creador del producto sea el mismo que esta autenticado
  const puedeBorrar = () => {
    if (!usuario) return false;

    if (creador.id === usuario.uid) {
      return true;
    }
  };

  //eliminando producto
  const eliminarProducto = async () => {
    if (!usuario) {
      return router.push("/login");
    }
    if (creador.id !== usuario.uid) {
      return router.push("/");
    }
    try {
      await firebase.db.collection("productos").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (Object.keys(producto).length === 0 && !error) {
    return (
      <Layout>
        <p>Cargando...</p>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <>
          {error ? (
            <Error404 />
          ) : (
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

                  {usuario && (
                    <>
                      {" "}
                      <h2>Agrega tu comentario</h2>
                      <form onSubmit={agregarComentario}>
                        <Campo>
                          <input
                            type="text"
                            name="mensaje"
                            onChange={comentarioChange}
                          />
                        </Campo>
                        <InputSubmit type="submit" value="Agregar Comentario" />
                      </form>
                    </>
                  )}

                  <h2
                    css={css`
                      margin: 2rem 0;
                    `}
                  >
                    Comentarios
                  </h2>
                  <ul>
                    {comentarios.map((comentario, i) => (
                      <li
                        key={`${comentario.usuarioId}-${i}`}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                      >
                        <p>{comentario.mensaje}</p>
                        <p>
                          Escrito por:{" "}
                          <span
                            css={css`
                              font-weight: bold;
                            `}
                          >
                            {comentario.usuarioNombre}
                          </span>{" "}
                        </p>
                        {esCreador(comentario.usuarioId) && (
                          <CreadorProducto>Es creador</CreadorProducto>
                        )}
                      </li>
                    ))}
                  </ul>
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
                  {usuario && <Boton onClick={votarProducto}>Votar</Boton>}
                  {puedeBorrar() && (
                    <Boton onClick={eliminarProducto}>Eliminar Producto</Boton>
                  )}
                </aside>
              </ContenedorProducto>
            </div>
          )}
        </>
      </Layout>
    );
  }
};

export default Producto;
