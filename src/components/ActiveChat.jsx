import { collection, onSnapshot, getDocs, doc, addDoc } from "firebase/firestore"
import { db } from "../db/firebase"
import { MessageList } from "./MessageList";
import { useEffect, useRef, useState } from "react";

export function ActiveChat({chat, user}){
    console.log("Active chat created: " + chat.name)
    const messageRef = collection(db, "chats", chat.id, "messages")
    const queryMessages = messageRef;
    const [userAsObjecs, setUserAsObjects] = useState([])
    const lastMessageRef = useRef(null)

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

              sortByDate()
            });
          });

          return () => {
            unsubscribe(); // Unsubscribe when the component is unmounted or dependency changes
          };
    },[chat])


    useEffect(()=>{
      let pageBottom = lastMessageRef.current.lastElementChild
      console.log(pageBottom)

      if(pageBottom != null){
        pageBottom.scrollIntoView()
      }
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




    // functions for updating the database
    async function addMessageDB(message){
      const messageRef = collection(db, "chats", chat.id, "messages")

      await addDoc(messageRef, message)
      .catch(e=>{
        console.log(e)
      })
    }
    async function deleteMessageDB(message){
      const chatRef = doc(db, "chats", chat.id)

      await deleteDoc(chatRef)
      .catch(e=>{
        console.log(e)
      })
    }
    async function modifyMessageDB(message){
      const chatRef = doc(db, "chats", chat.id)

      await updateDoc(chatRef,{
        name: chat.name,
        users: chat.users
      })
      .catch(e=>{
        console.log(e)
      })
    }




    const handleSubmit = event =>{
      event.preventDefault()
      const message = event.target.message.value
      const userSendingMessage = user.uid
      const createdAt = new Date()

      const messageObj = {
        message: message,
        user:userSendingMessage,
        createdAt: createdAt
      }

      addMessageDB(messageObj)
    }





    function sortByDate(){
      setMessages(currentMessages =>{
          return[
            ...currentMessages.sort((a,b)=>{
              return a.createdAt - b.createdAt
            })
          ]
        }
      )
    }



    return(
        <>
            <div id="chatHeader">
              <h2>{chat.name}</h2>
            </div>
            <div ref={lastMessageRef} id="chatBody">
              <MessageList messages={messages} userAsObjecs={userAsObjecs}/>
            </div>
            <div id="chatFooter">
              <form id="sendMessageForm" onSubmit={handleSubmit}>
                <input name="message" type="text" className="form-control" id="usr"/>
                <button id="submitMessage" type="submit" className="btn btn-default">Send</button>
              </form>
            </div>
            {messages && console.log(messages)}
        </>
    )
}