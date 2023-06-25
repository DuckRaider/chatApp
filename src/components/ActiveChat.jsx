import { collection, onSnapshot, getDocs } from "firebase/firestore"
import { db } from "../db/firebase"
import { MessageList } from "./MessageList";
import { useEffect, useState } from "react";

export function ActiveChat({chat}){
    console.log("Active chat created: " + chat.name)
    const messageRef = collection(db, "chats", chat.id, "messages")
    const queryMessages = messageRef;
    const [userAsObjecs, setUserAsObjects] = useState([])

    const [messages, setMessages] = useState([])

    useEffect(()=>{
        // get users in chat as objects
        const usersRef = collection(db, "users")
        getDocs(usersRef)
        .then(result => {
          let userArray = [];

          result.forEach(doc =>{
            if(chat.users.indexOf(doc.id) > -1){
              console.log("user added")
              userArray.push({id:doc.id, email: doc.data().email, displayName: doc.data().displayName})
            }
          })

          console.log(userArray)
          setUserAsObjects(userArray)
        })


        setMessages([])
        const unsubscribe = onSnapshot(queryMessages, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              let changedMessage = { id: change.doc.id, ...change.doc.data() };
        
              if (change.type === "added") {
                addMessage(changedMessage)
              }
              if (change.type === "modified") {
                modifyMessage(changedMessage)
              }
              if (change.type === "removed") {
                deleteMessage(changedMessage)
              }
            });
          });

          return () => {
            unsubscribe(); // Unsubscribe when the component is unmounted or dependency changes
          };
    },[chat])

    useEffect(()=>{

    },[messages])







    function addMessage(message){
        setMessages((currentMessages)=>{
            return[
                ...currentMessages,
                {user:message.user, id:message.id,message:message.message, createdAt:message.createdAt}
            ]
        })
    }
    function deleteMessage(message){
      setMessages(currentMessages=>{
        return currentMessages.filter(theMessageToDelete => theMessageToDelete.id !== message.id)
      })
    }
    function modifyMessage(message){
      setMessages(currentMessages=>{
        currentMessages = currentMessages.map(element => {
          if(element.id === message.id){
            return message
          }
          return element
        })
  
        return currentMessages
      }
      )
    }




    function sortByDate(){
      setMessages(currentMessages =>{
        
        }
      )
    }
    return(
        <>
            {messages && console.log(messages)}
            <h3>Active Chat: {chat.name}</h3>
            <MessageList messages={messages} userAsObjecs={userAsObjecs}/>
        </>
    )
}