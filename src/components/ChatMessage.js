import { projectAuth } from "../config"
import { Container, Image } from "@chakra-ui/react" 
import './ChatMessage.css'
export default function ChatMessage({message, id}) {
    const { text, uid, photoURL } = message 
    /// to make conditional styling by varying the class 
    const messageClass = uid === projectAuth.currentUser.uid ? 'from-me' : 'from-them'
    return (
      <Container  
        w="100%" 
        className="line-container" 
        display="flex" 
        flexDirection={messageClass == 'from-me' ? 'row-reverse' : '' }>
        <Image mt={1} p={1} src={photoURL} boxSize="50px" overflow="visible" borderRadius="full"/> 
        <Container flexGrow="1" className="message">
          <p className={messageClass}>{text}</p>
        </Container>
      </Container>
    )
  }