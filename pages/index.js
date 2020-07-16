import React from "react";
import Layout from "../components/layout/Layout";
import DetallesProductos from "../components/layout/DetallesProducto";
import useOrderBy from "../hooks/useOrderBy";

export default function Home() {
  const { productos } = useOrderBy("creado");
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {productos.map((producto) => (
                <DetallesProductos key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
