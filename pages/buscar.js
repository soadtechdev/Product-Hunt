import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import DetallesProductos from "../components/layout/DetallesProducto";
import useOrderBy from "../hooks/useOrderBy";
import { useRouter } from "next/router";

const Buscar = () => {
  const router = useRouter();

  const {
    query: { q },
  } = router;

  //todos los productos
  const { productos } = useOrderBy("creado");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = productos.filter((producto) => {
      return producto.nombre.toLowerCase().includes(busqueda);
    });

    setResultado(filtro);
  }, [q, productos]);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map((producto) => (
                <DetallesProductos key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Buscar;
