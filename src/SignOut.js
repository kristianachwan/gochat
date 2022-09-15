import { projectAuth } from './config';
export default function SignOut(){
    return ( 
    <>
      {projectAuth.currentUser && <button className="sign-out" onClick={() => projectAuth.signOut()}>Sign Out</button>}
    </> 
    )
  }