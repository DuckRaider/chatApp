import { Message } from "./Message"

export function MessageList({chat, messages, userAsObjecs, user}){
    return(
        <>
            {messages==null && <p>No Messages. Write Something!</p>}
            {messages != null && messages.map(message=>{
                return(
                    <Message key={message.id} chat={chat} message={message} userAsObjecs={userAsObjecs} user={user}/>
                )
            })}
        </>
    )
}