import React from "react";
import Buscar from "../UI/Buscar";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <p>P</p>

          <Buscar />

          {/**Nav aqui */}
        </div>

        <div>{/**Menu de admin aqui */}</div>
      </div>
    </header>
  );
};

export default Header;
