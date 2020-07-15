import app from "firebase/app";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    //verificar que no haya aplicacion creada
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
  }
}

const firebase = new Firebase();

export default firebase;
