import { useEffect } from "react"
import { deleteMessageDB } from "../functions/DBFunctions/deleteMessageDB"

export function Message({chat, message, userAsObjecs, user}){
    function getUserDisplayNameById(){
        // check if system info message
        if(message.user == "system"){
            return "====SYSTEM===="
        }

        // get the user
        const userMessage = userAsObjecs.find(object => {
            return object.id === message.user
        })

        if(!userMessage){
            return "DELETED USER"
        }
        return userMessage?.displayName
    }

    return(
        <>
            <div className="message">
                <p className="username">{`${getUserDisplayNameById()}`}</p>
                {user.uid === message.user && <button className="btn btn-primary" onClick={()=>deleteMessageDB(chat, message)}>Delete Message</button>}
                <p className="messageFromUser">{message.message}</p>
            </div>
        </>
    )
}