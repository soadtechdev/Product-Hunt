import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    //verificar que no haya aplicacion creada
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
  }

  //registrar un usuario
  async registrar(nombre, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      displayName: nombre,
    });
  }
}

const firebase = new Firebase();

export default firebase;
