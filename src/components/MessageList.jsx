import { Message } from "./Message"

export function MessageList({messages}){
    return(
        <>
            {messages==null && <p>No Messages. Write Something!</p>}
            {messages != null && messages.map(message=>{
                return(
                    <Message key={message.id} message={message}/>
                )
            })}
        </>
    )
}