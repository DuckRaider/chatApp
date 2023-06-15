export function Chat({chat, setChat}){
    return(
        <>
            <button onClick={() => setChat(chat)}>{chat.name}</button>
        </>
    )
}