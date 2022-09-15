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
  import { Image, Container } from '@chakra-ui/react'


  function App() {
    // get the user 
    const [user] = useAuthState(projectAuth) 
    return (
      <Container w="100%" h="100vh" className="App">
        <Container w="100%" display="flex" justifyContent="space-between">
          <Image  
            mt={4}
            boxSize='50px'
            objectFit='cover'
            src={goChatIcon} alt='logo' 
          />  
          <SignOut/> 
        </Container>
        


        
        {/* only show the chatRoom if user is authenticated */}
        {user ? <ChatRoom /> : <SignIn />}
      </Container>
    );
  }

  export default App;
