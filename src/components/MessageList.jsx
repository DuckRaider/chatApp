import { Message } from "./Message"

export function MessageList({messages, userAsObjecs}){
    return(
        <>
            {messages==null && <p>No Messages. Write Something!</p>}
            {messages != null && messages.map(message=>{
                return(
                    <Message key={message.id} message={message} userAsObjecs={userAsObjecs}/>
                )
            })}
        </>
    )
}