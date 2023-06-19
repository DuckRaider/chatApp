import { addDoc } from "firebase/firestore";
import { db } from "../db/firebase";

export async function addUserToDB(user){
    const userRef = doc(db, user)
    let userExists = false;

    // check if user already exists
    const snapshot = await collection(db, 'users').get();
    let users = snapshot.docs.map(doc => doc.data());

    users.forEach(element => {
        if(element.id === user.id){
            userExists = true;
        }
    });

    if(!userExists){
        await addDoc(userRef, user)
    }
}