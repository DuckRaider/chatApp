export function Chat({chat, setChat}){
    return(
        <>
            <div onClick={()=>setChat(chat)} className="chat">
                <p>{chat.name}</p>
            </div>
            {/* <button onClick={() => setChat(chat)}>{chat.name}</button> */}
        </>
    )
}