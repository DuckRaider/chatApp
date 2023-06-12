import { signInUser, signOut, auth, signInWithGoogle } from "./db/firebase"
import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";

export function Login(){
    const [authUser, setAuthUser] = useState(null)

    useEffect(()=>{
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user)
            }else{
                setAuthUser(null)
            }
        })
    },[])

    const handleSubmit = event => {
        event.preventDefault()
        const email = event.target.inputEmail.value
        const password = event.target.inputPassword.value

        signInUser(email, password)
    }


    return(
        <>
            { authUser ? 
            <div id="loginSignedIn">
                <h1>Already signed in!</h1>
                <button id="signOutButton" onClick={signOut} className="btn btn-primary">Sign out</button>
            </div> : 
            <div id="loginDiv">
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" name="inputEmail" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" name="inputPassword"/>
                </div>
                <button id="loginFormSubmit" type="submit" className="btn btn-primary">Login</button>
                </form>
                <p>Google Account? <a id="aSignInWithGoogle" onClick={signInWithGoogle} href="#">Sign in with Google</a></p>
                <p>No Account? <a href="register">Register now</a></p>
            </div>
            }
        </>
    )
}