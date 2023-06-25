import { addDoc, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { db } from "../db/firebase";

export async function addUserToDB(user){
    console.log("addUser started")
    console.log(user)
    const userRef = doc(db, "users", user.uid)
    let userExists = false;

    // check if user already exists
    // const snapshot = await collection(db, 'users').get();
    // let users = snapshot.docs.map(aDoc => aDoc.data());

    // users.forEach(element => {
    //     if(element.id === user.uid){
    //         userExists = true;
    //     }
    // });
    // onSnapshot(query(userRef), (snapshot) => {
    //     snapshot.forEach((doc) => {
    //         // more things here, NOT DONE ALREADY
    //     });
    // });

    if(!userExists){
        await setDoc(userRef, {
            email:user.email
        })
    }

    console.log("addUser ended")
}