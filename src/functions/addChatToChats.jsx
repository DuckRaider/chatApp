export function addChatsToChats(user, addChatDB){
    let name = prompt("Group name:")

    if(name != ""){
        let chat = {
            name:name,
            users:[user.uid]
        }

        addChatDB(chat)
    }
    else{
        alert("Name must be longer than 0 chars")
    }
}