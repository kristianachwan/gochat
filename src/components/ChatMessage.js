import { projectAuth } from "../config"
import { Container, Image } from "@chakra-ui/react" 
import './ChatMessage.css'
export default function ChatMessage({message, id}) {
    const { text, uid, photoURL } = message 
    /// to make conditional styling by varying the class 
    const messageClass = uid === projectAuth.currentUser.uid ? 'from-me' : 'from-them'
    return (
      <Container  
        my="1"
        w="100%" 
        className="line-container" 
        display="flex" 
        flexDirection={messageClass == 'from-me' ? 'row-reverse' : '' }>
        <Image src={photoURL} boxSize="50px" borderRadius="full"/>
        <Container flexGrow="1" className={`${messageClass} message`}>
          <p className={messageClass}>{text}</p>
        </Container>
      </Container>
    )
  }