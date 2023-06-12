export function Chat({chat, setChat}){
    return(
        <>
            <h1>All Chats:</h1>
            <button onClick={() => setChat(chat)}>{chat.name}</button>
        </>
    )
}