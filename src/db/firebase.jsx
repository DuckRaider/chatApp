import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyBuUWz_HO2MkiiK4r2CNS7Fmo7cFdC6nkg",
    // authDomain: "chatapp-ece7a.firebaseapp.com",
    // projectId: "chatapp-ece7a",
    // storageBucket: "chatapp-ece7a.appspot.com",
    // messagingSenderId: "779760565378",
    // appId: "1:779760565378:web:d58fd2f901d999dc91c89b"
    apiKey: "AIzaSyDagOQSi9jMhCTj88lKFxwNC6Fjfw3dxOs",
    authDomain: "chatappv2-50d2d.firebaseapp.com",
    projectId: "chatappv2-50d2d",
    storageBucket: "chatappv2-50d2d.appspot.com",
    messagingSenderId: "290276841059",
    appId: "1:290276841059:web:dad1eca51a4bf2ea374a56"
};

function createUser(email, password){
    //from https://firebase.google.com/docs/auth/web/password-auth?hl=en#create_a_password-based_account
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("WORKED")
      setLoginInformation(user.email)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  });
}
function signInUser(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("Successful sign in")
        // ...
        window.location.replace("/")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}
function signOut(){
    auth.signOut()
}

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
let currentUser = getAuth(app).currentUser

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user
        return user;
    } else {
        return null;
    }
});

function signInWithGoogle(){
    signInWithPopup(auth, provider)
    .then(result => {
        //from https://firebase.google.com/docs/auth/web/google-signin?hl=de
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        window.location.replace("/")
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

function getUser(){
    return currentUser
}

export{db, auth, createUser, signInUser, getUser, signOut, signInWithGoogle}