import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../db/firebase"

export async function modifyMessageDB(chat, message){
    const chatRef = doc(db, "chats", chat.id, message.id)

    await updateDoc(chatRef,{
      name: chat.name,
      users: chat.users
    })
    .catch(e=>{
      console.log(e)
    })
}