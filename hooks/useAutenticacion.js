import React, { useEffect, useState } from "react";
import firebase from "../server/firebase";

function useAutenticacion() {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        setUserAuth(usuario);
      } else {
        setUserAuth(null);
      }
    });
    return () => unsuscribe();
  }, []);

  return userAuth;
}

export default useAutenticacion;
