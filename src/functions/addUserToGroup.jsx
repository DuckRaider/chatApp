import { doc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";

export async function addUserToGroup(chat, uid){
    // check if user is already in group
    if(chat.users.indexOf(uid) == -1){
        chat.users.push(uid)
        const chatRef = doc(db, "chats", chat.id)
        await updateDoc(chatRef, chat)
    }else{
        alert("User is already in group")
    }
}