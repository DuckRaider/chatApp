import { useEffect } from "react"

export function Message({message, userAsObjecs}){
    function getUserDisplayNameById(){
        const user = userAsObjecs.find(object => {
            console.log(object)
            console.log(message)
            return object.id === message.user
        })

        return user.displayName
    }

    return(
        <>
            <p>{`${getUserDisplayNameById()}`}</p>
            <p>{message.message}</p>
        </>
    )
}