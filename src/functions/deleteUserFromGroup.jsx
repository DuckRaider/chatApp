import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";

export async function deleteUserFromGroup(chat, user, getUsersFromDB){
    chat.users = chat.users.filter(e => e !== user.uid)

    const chatRef = doc(db, "chats", chat.id)
    updateDoc(chatRef, chat)

    // info/message that user left the chat
    const systemMessage = {createdAt: new Date(), user:"system", message:user.displayName + " left the chat"}
    const messageRef = collection(db, "chats", chat.id, "messages")

    console.log(systemMessage)

    addDoc(messageRef, systemMessage)
    .catch(e=>{
      console.log(e)
    })
}