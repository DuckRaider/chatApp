import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";
import { addSystemMessage } from "./addSystemMessage";

export async function deleteUserFromGroup(chat, user){
    chat.users = chat.users.filter(e => e !== user.uid)

    const chatRef = doc(db, "chats", chat.id)
    updateDoc(chatRef, chat)

    addSystemMessage(chat, user, user?.displayName + " left the chat")
}