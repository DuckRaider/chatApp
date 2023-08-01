import { useEffect } from "react"
import { deleteMessageDB } from "../functions/DBFunctions/deleteMessageDB"
import deleteImg from '../images/delete.png'

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
                <div className="messageHeader">
                    <p className="username">{`${getUserDisplayNameById()}`}</p>
                    {user.uid === message.user && <img className="deleteImg" src={deleteImg} alt="bin image" onClick={()=>deleteMessageDB(chat, message)}/>}
                </div>
                <p className="messageFromUser">{message.message}</p>
            </div>
        </>
    )
}