export function Chat({chat, setChat}){
    return(
        <>
            <div onClick={()=>setChat(chat)} className="message">
                <p>{chat.name}</p>
            </div>
            {/* <button onClick={() => setChat(chat)}>{chat.name}</button> */}
        </>
    )
}