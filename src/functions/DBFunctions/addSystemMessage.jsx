import { addDoc, collection } from "firebase/firestore"
import { db } from "../../db/firebase"

export async function addSystemMessage(chat, user, message){
    const systemMessage = {createdAt: new Date(), user:"system", message: message}
    const messageRef = collection(db, "chats", chat.id, "messages")

    console.log(systemMessage)

    addDoc(messageRef, systemMessage)
    .then(()=>{
      window.location.reload()
    })
    .catch(e=>{
      console.log(e)
    })
}