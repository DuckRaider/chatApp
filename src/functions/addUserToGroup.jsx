import { doc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";

export async function addUserToGroup(chat, uid){
    chat.users.push(uid)
    const chatRef = doc(db, "chats", chat.id)
    await updateDoc(chatRef, chat)
}