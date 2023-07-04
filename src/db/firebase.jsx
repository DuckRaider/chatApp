import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, updateProfile } from "firebase/auth";
import { addUserToDB } from "../functions/DBFunctions/addUserToDB";

const firebaseConfig = {
    apiKey: "AIzaSyDagOQSi9jMhCTj88lKFxwNC6Fjfw3dxOs",
    authDomain: "chatappv2-50d2d.firebaseapp.com",
    projectId: "chatappv2-50d2d",
    storageBucket: "chatappv2-50d2d.appspot.com",
    messagingSenderId: "290276841059",
    appId: "1:290276841059:web:dad1eca51a4bf2ea374a56"
};

function createUser(email, password, displayName){
    //from https://firebase.google.com/docs/auth/web/password-auth?hl=en#create_a_password-based_account
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const userRef = doc(db, "users", userCredential.user.uid)

        // Signed in 
        const user = userCredential.user;

        // add user to collection
        setDoc(userRef, {
            email: user.email,
            displayName: displayName
        })
        .then(()=>{
            console.log("User added to collection")
        })
        
        //update name
        updateProfile(user, {
            displayName: displayName
        }).then(() => {
            console.log("Display name updated")
        }).catch((error) => {
            console.log("Error updating display name")
        })

        // everything after setLoginInformation doesn't get executed
        alert("worked")
        setLoginInformation(user.email)


        // redirect not implemented right now
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

        // add created user to db
        addUserToDB(user)

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


export{db, auth, createUser, signInUser, signOut, signInWithGoogle}