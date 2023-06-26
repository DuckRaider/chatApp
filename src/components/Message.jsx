import { useEffect } from "react"

export function Message({message, userAsObjecs}){
    function getUserDisplayNameById(){
        const user = userAsObjecs.find(object => {
            return object.id === message.user
        })

        // Problem: the userAsObjects is not updated after adding a new user -> error displaying name
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