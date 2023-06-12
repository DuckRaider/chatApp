import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../db/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MessageList } from "./MessageList";
import { useEffect, useState } from "react";

export function ActiveChat({chat}){
    const messageRef = collection(db, "chats", chat.id, "messages")
    const queryMessages = messageRef;

    const [messages, setMessages] = useState([])
    // const [messages] = useCollectionData(queryMessages, {idField: "id"});

    useEffect(()=>{
        const unsubscribe = onSnapshot(queryMessages, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              let changedMessage = { id: change.doc.id, ...change.doc.data() };
        
              if (change.type === "added") {
                addMessage(changedMessage)
              }
              if (change.type === "modified") {
                console.log("Modified message: ", change.doc.data());
              }
              if (change.type === "removed") {
                console.log("Removed message: ", change.doc.data());
              }
            });
          });
        
          return () => {
            unsubscribe(); // Unsubscribe when the component is unmounted or dependency changes
          };
    },[])

    function addMessage(message){
        setMessages((currentMessages)=>{
            return[
                ...currentMessages,
                {user:message.user, id:message.id,message:message.message, createdAt:message.createdAt}
            ]
        })
    }

    return(
        <>
            <h3>Active Chat: {chat.name}</h3>
            <MessageList messages={messages}/>
        </>
    )
}