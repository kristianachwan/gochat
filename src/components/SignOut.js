import { Button } from '@chakra-ui/react';
import { projectAuth } from '../config';
export default function SignOut(){
    return ( 
    <>
      {projectAuth.currentUser && 
        (<Button mt={4} className="sign-out" onClick={() => projectAuth.signOut()}>Sign Out</Button>
      )}
    </> 
    )
  }