import './App.css'; 

import { useAuthState } from 'react-firebase-hooks/auth';
import goChatIcon from './assets/images/favicon.png'

//import firebase services 
import { projectAuth } from './config';

//importing component related to authentication 
import SignIn from './components/SignIn'; 
import SignOut from './components/SignOut'

// importing other components 
import ChatRoom from './components/ChatRoom'

// chakraUI 
import { Image, Container, Link } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react';
import { AiOutlineGithub } from "react-icons/ai";

function App() {
    // get the user 
    const [user] = useAuthState(projectAuth) 
    return (
      <Container w="100%" h="100vh" className="App">
        <Container w="100%" display="flex" justifyContent="space-between">
          {/* <Image  
            mt={4}
            boxSize='50px'
            objectFit='cover'
            src={goChatIcon} alt='logo' 
          />   */}
          <Link href="https://github.com/kristianachwan/gochat" target="_blank">
            <Icon 
              className="social-media-icon" 
              w="30px" h="40px" 
              mt={4} 
              as={AiOutlineGithub}
            />
          </Link>
          
          <SignOut/> 
        </Container>
        

        {/* only show the chatRoom if user is authenticated */}
        <Container w="100%" display="flex" justifyContent="center">{user ? <ChatRoom /> : <SignIn />}</Container>
        
        
      </Container>
    );
  }

  export default App;
