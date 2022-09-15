import ChatMessage from "./ChatMessage"
import { projectAuth, projectFirestore } from "../config"
import { useState, useRef } from "react"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from "@firebase/app-compat";
//assets import 
import sendIcon from '../assets/images/send-button.png'  

export default function ChatRoom () {
    // to add scroll effect to the latest msg
    const dummy = useRef()

    //making the reference to the collection 
    const messageRef = projectFirestore.collection('messages')

    // requesting data, ordered by the latest created time and fetching at most 30 chat limits 
    // to prevent any crash  
    const query = messageRef.orderBy('createdAt').limit(30)
      
    // to give idField 
    const [messages] = useCollectionData(query, {idField : "id"}) 

    // create 2 way binding value 
    const [currMsg, setCurrMsg] = useState('')
    // use async so that I am able to use await keyword 
    const sendMessage = async (e) => {
      e.preventDefault() 
      const { uid, photoURL } = projectAuth.currentUser; 
      await messageRef.add({
        text: currMsg, 
        createdAt: firebase.firestore.FieldValue.serverTimestamp() , 
        uid, 
        photoURL
      }) 
      setCurrMsg('')
      dummy.current.scrollIntoView({behaviour: 'smooth'})
    }
    return (
      <>
        <main className="chatRoom">
          {messages && messages.map(msg => <><ChatMessage key={msg.id} message={msg}/></>)}
          <span ref={dummy}></span>
        </main>
        <form onSubmit={sendMessage}>
          <input value={currMsg} onChange={e => setCurrMsg(e.target.value)}/> 
          <button type="submit"><img src={sendIcon}/></button> 
        </form>
      </>
    )
  } 