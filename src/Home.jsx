import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "./db/firebase";
import { collection, query, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Chat } from "./components/Chat";
import { ChatList } from "./components/ChatList";
import { useEffect, useState } from "react";
import { ActiveChat } from "./components/ActiveChat";
import { addChatsToChats } from "./functions/addChatToChats";

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
            let changedChat = { id: change.doc.id, ...change.doc.data()};
    
            if (change.type === "added") {
              addChat(changedChat);
            }
            if (change.type === "modified") {
              modifyChat(changedChat)

              if(activeChat){
                setActiveChat(()=>{
                  chats.map(chat => {
                    if(chat.id === activeChat.id){
                      console.log(chat)
                      return chat
                    }
                  })
                })
              }
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



  // functions for updating the states
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
  function modifyChat(chat){
    setChats(currentChats=>{
      currentChats = currentChats.map(element => {
        if(element.id === chat.id){
          return chat
        }
        return element
      })

      return currentChats
    }
    )
  }




  // functions for updating the database
  async function addChatDB(chat){
    const chatRef = collection(db, "chats")

    await addDoc(chatRef, chat)
    .catch(e=>{
      // error
      // error
      console.log(e)
    })
  }
  async function modifyChatDB(chat){
    const chatRef = doc(db, "chats", chat.id)

    await updateDoc(chatRef,{
      name: chat.name,
      users: chat.users
    })
    .catch(e=>{
      console.log(e)
    })
  }




  function setChat(chat){
      setActiveChat(chat) 
  }

  return(
      <>
        <div id="wrapper">
          <div id="chatsBar">
            <div id="chatsBarHeader">
              {user && <button className="btn btn-primary" onClick={()=>addChatsToChats(user, addChatDB)}>Create chat</button>}
              <button className="btn btn-primary" onClick={()=>window.location.replace("/login")}>Login</button>
            </div>
            {chats && <ChatList chats={chats} setChat={setChat}/>}
            <div id="userCell">
              <h3>{user?.displayName}</h3>
              <h4>{user?.uid}</h4>
            </div>
          </div>
          <div id="activeChat">
            {activeChat == null && <h2>No chat selected</h2>}
            {activeChat && <ActiveChat chat={activeChat} user={user}/>}
          </div>
        </div>
      </>
  )
}