import { collection, doc, updateDoc, getDocs } from "firebase/firestore";
import { db } from "../db/firebase";

export async function addUserToGroup(chat, getUsersFromDB){
    // get UID
    let uid = prompt("Type in UserID")

    // check if user is already in group
    if(chat.users.indexOf(uid) == -1){
        // check if user exists
        let userExists = false
        const usersRef = collection(db, "users")
        getDocs(usersRef)
        .then((result) => {
            result.forEach(docc =>{
            if(docc.id === uid){
                userExists = true
            }

            if(userExists == true){
                chat.users.push(uid)
                const chatRef = doc(db, "chats", chat.id)
                updateDoc(chatRef, chat)
                getUsersFromDB()
            }
            else{
            }
          })
        })
    }else{
    }
}