import './App.css'; 

   
// importing hooks 
import { useState, useRef } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//assets import 
import sendIcon from './assets/images/send-button.png' 
import goChatIcon from './assets/images/favicon.png'

//import firebase services 
import { projectAuth, projectFirestore } from './config';
import firebase from 'firebase/compat/app'; 

function App() {
  // get the user 
  const [user] = useAuthState(projectAuth) 
  //sign in component 
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider() 
    console.log('asd')
    projectAuth.signInWithPopup(provider)
  }

  function SignIn() {   
    return (<button className="sign-in" onClick={signInWithGoogle}>Sign in with google</button>)
  }
  // sign out component
  function SignOut(){
    return ( 
    <>
      {projectAuth.currentUser && <button className="sign-out" onClick={() => projectAuth.signOut()}>Sign Out</button>}
    </> 
    )
  }
  // functional component for the chatroom 
  function ChatRoom () {
    const dummy = useRef()
    //making the reference to the collection 
    const messageRef = projectFirestore.collection('messages')
    // requesting data, ordered by the latest created time and fetching at most 30 chat limits 
    // to prevent any crash  
    const query = messageRef.orderBy('createdAt').limit(30)
      
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
  //creating individual chat cloud 

  function ChatMessage({message, key}) {

    const { text, uid, photoURL } = message 
    /// to make conditional styling by varying the class 

    const messageClass = uid === projectAuth.currentUser.uid ? 'from-me' : 'from-them'
    
    return (
      <div className="line-container">
      <div className={`imessage imessage${messageClass}`}>
        <img src={photoURL} />
        <p className={messageClass}>{text}</p>
      </div>
      </div>
    )
  }



  return (
    <div className="App">
      <header>
        <img src={goChatIcon} />
        <p>goChat</p>
        <SignOut /> 


      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
