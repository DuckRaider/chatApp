import { Chat } from "./Chat";

export function ChatList({chats, setChat}){
    console.log(chats)

    return(
        <>
            <ul>
                {chats==null && <p>No chats</p>}
                {chats.map(chat=>{
                    return(
                        <Chat key={chat.id} chat={chat} setChat={setChat}/>
                    )
                })}
            </ul>
        </>
    )
}