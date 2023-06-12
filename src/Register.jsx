import { auth, createUser } from "./db/firebase";

export function Register(){
    const handleSubmit = event => {
        event.preventDefault()
        const email = event.target.inputEmail.value
        const password = event.target.inputPassword.value
        const passwordAgain = event.target.inputPasswordAgain.value

        if(password == passwordAgain){
            createUser(email, password)
        }else{
            appendAlert("Passwords not identical","danger")
        }
    }


    //create a warning according with message as parameter
    function appendAlert(message, type){
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
    }


    return(
        <div id="registerDiv">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">Email address</label>
                <input required type="email" className="form-control" id="inputEmail" name="inputEmail" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Password</label>
                <input required type="password" minLength={6} className="form-control" id="inputPassword" name="inputPassword"/>
            </div>
            <div className="mb-3">
                <label htmlFor="inputPasswordAgain" className="form-label">Repeat Password</label>
                <input required type="password" minLength={6} className="form-control" id="inputPasswordAgain" name="inputPasswordAgain"/>
            </div>
            <button id="submitRegister" type="submit" className="btn btn-primary">Register</button>
            </form>

            <div id="liveAlertPlaceholder"></div>
        </div>
    )
}