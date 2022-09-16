import ChatMessage from "./ChatMessage"
import { projectAuth, projectFirestore } from "../config"
import { useState, useRef } from "react"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from "@firebase/app-compat";
//assets import 
import sendIcon from '../assets/images/send-button.png'  
import { Input, Container, Button, Img } from "@chakra-ui/react";
 
// css 
import './ChatRoom.css'
import { useEffect } from "react";
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
    <Container className="iphone">      
      <div className="iphone-small-round-top"></div>
      <div className="iphone-round-top-left"></div>
      <div className="iphone-speaker"></div>
      <Container className="iphone-screenshot" p="0">
        <Container p="0" w="90%" height="70vh" overflowY="scroll" className="chatRoom">
          {messages && messages.map(msg => <ChatMessage key={Math.random()} message={msg}/>)}
          <span ref={dummy}></span>
        </Container>

        <form onSubmit={sendMessage}> 
          <Container w="95%" display="flex" flexWrap="nowrap" p="0" justifyContent="space-between">
            <Input value={currMsg} onChange={e => setCurrMsg(e.target.value)}/> 
            <Button type="submit"><Img w="30px" src={sendIcon}/></Button> 
          </Container>       
        </form>  
        <Container h="5px"></Container>
      </Container> 

      <div className="iphone-button"></div>

    </Container>

      


    )
} 