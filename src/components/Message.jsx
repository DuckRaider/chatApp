export function Message({message}){
    return(
        <>
            <p>{message.user}</p>
            <p>{message.message}</p>
        </>
    )
}