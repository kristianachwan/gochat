import { projectAuth } from "../config"

export default function ChatMessage({message, key}) {
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