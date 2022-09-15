import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody } from '@chakra-ui/react';
import firebase from 'firebase/compat/app';   
import { projectAuth } from '../config'; 
import { useRef } from 'react';
export default function SignIn() {  
    
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider() 
        projectAuth.signInWithPopup(provider)
    }
    return (
        <>
        <AlertDialog isOpen isCentered>
            <AlertDialogOverlay>
            <AlertDialogContent h="50vh">
                <AlertDialogBody display="flex" alignItems="center" justifyContent="center">
                    <Button className="sign-in" onClick={signInWithGoogle}>Sign in with google</Button>
                </AlertDialogBody>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
    )
    
  }