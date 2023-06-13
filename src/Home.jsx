import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "./db/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Chat } from "./components/Chat";
import { ChatList } from "./components/ChatList";
import { useEffect, useState } from "react";
import { ActiveChat } from "./components/ActiveChat";

export function Home(){
  const navigate = useNavigate()

  const [user] = useAuthState(auth)
  const [activeChat,setActiveChat] = useState()

  const [chats, setChats] = useState([])
  const queryChats = query(collection(db, "chats"))


  useEffect(()=>{
    const unsubscribe = onSnapshot(queryChats, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          // Following check for user in db works!!!
          // change.doc.data().users.indexOf("LrOqrJaaqUdDZIuYxcv0xEp80E2")>-1
          if(change.doc.data().users.indexOf(user?.uid)>-1){
            let changedChat = { id: change.doc.id, ...change.doc.data() };
    
            if (change.type === "added") {
              addChat(changedChat);
            }
            if (change.type === "modified") {
              console.log("Modified message: ", change.doc.data());
            }
            if (change.type === "removed") {
              console.log("Removed message: ", change.doc.data());
              deleteChat(changedChat);
            }
          }
        });
      });
      
      return () => {
        unsubscribe(); // Unsubscribe when the component is unmounted or dependency changes
      };
  },[user])



  function addChat(chat){
    setChats(currentChats=>{
        return[
            ...currentChats,
            {name:chat.name,users:chat.users,id:chat.id}
        ]
    })
  }
  function deleteChat(chat){
    setChats(currentChats=>{
      return currentChats.filter(theChatToDelete => theChatToDelete.id !== chat.id)
    })
  }




  function setChat(chat){
      console.log("setChatExecuted")
      console.log(chat)
      setActiveChat(chat) 
  }

  return(
      <>
        {chats && <ChatList chats={chats} setChat={setChat}/>}
        <h1>========================================</h1>
        {activeChat && <ActiveChat chat={activeChat}/>}
      </>
  )
}