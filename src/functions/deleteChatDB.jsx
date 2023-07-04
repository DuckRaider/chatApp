import { deleteDoc, doc } from "firebase/firestore"

export async function deleteChatDB(chat){
    const chatRef = doc(db, "chats", chat.id)

    await deleteDoc(chatRef)
    .catch(e=>{
        console.log(e)
    })
}