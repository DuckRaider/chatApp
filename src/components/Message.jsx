import { useEffect } from "react"

export function Message({message}){
    // For displaying users: when sending a message, save the user in the DB instead of the UID
    return(
        <>
            <p>{message.user}</p>
            <p>{message.message}</p>
        </>
    )
}