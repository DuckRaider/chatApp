import { useEffect } from "react"

export function Message({message, userAsObjecs}){
    function getUserDisplayNameById(){
        // check if system info message
        if(message.user == "system"){
            return "====SYSTEM===="
        }

        // get the user
        const user = userAsObjecs.find(object => {
            return object.id === message.user
        })

        if(!user){
            return "DELETED USER"
        }
        return user?.displayName
    }

    return(
        <>
            <div className="message">
                <p className="username">{`${getUserDisplayNameById()}`}</p>
                <p className="messageFromUser">{message.message}</p>
            </div>
        </>
    )
}