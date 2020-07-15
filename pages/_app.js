import App from "next/app";
import firebase, { FirebaseContext } from "../server/index";
import useAutenticacion from "../hooks/useAutenticacion";

const MyApp = (props) => {
  const usuario = useAutenticacion();
  console.log(usuario);
  const { Component, pageProps } = props;
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};
export default MyApp;
