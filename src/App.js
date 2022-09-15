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
function App() {
  // get the user 
  const [user] = useAuthState(projectAuth) 
  return (
    <div className="App">
      <header>
        <img src={goChatIcon} />
        <p>goChat</p>
        <SignOut /> 
      </header>
      <section>
        {/* only show the chatRoom if user is authenticated */}
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
