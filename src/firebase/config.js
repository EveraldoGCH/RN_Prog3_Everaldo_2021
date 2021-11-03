import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDe6VTHPqjNHNweH-ssidVTAY0L6q7xF2c",
    authDomain: "rn-prog3-everaldo-2021.firebaseapp.com",
    projectId: "rn-prog3-everaldo-2021",
    storageBucket: "rn-prog3-everaldo-2021.appspot.com",
    messagingSenderId: "882457078687",
    appId: "1:882457078687:web:c96ed791ca54a1cb156baa"
  };

app.initializeApp(firebaseConfig)

export const auth=firebase.auth()
export const storage=firebase.storage()
export const db=app.firestore()
