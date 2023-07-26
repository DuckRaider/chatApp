import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../db/firebase"

export async function deleteMessageDB(chat, message){
    const chatRef = doc(db, "chats", chat.id, "messages", message.id)

    await deleteDoc(chatRef)
    .catch(e=>{
      console.log(e)
    })
}