"use client"

import { auth, db } from "@/config/firebase.config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authSignOut } from "@/lib/auth-utils";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { loginUser, signoutUser } from "@/redux/user.slice";
import { useDispatch } from "react-redux";
import UserData from "@/app/projects/components/UserData";


const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signoutUser())
    authSignOut()
  };

  useEffect(() => {
    try {
      const authStatus = auth.onAuthStateChanged(cred => {
        if (cred) {
          try {
            const docRef = doc(db, "caditor-users", cred.uid);
            getDoc(docRef).then(document => {
              if (document.exists()) {
                // user exists, get user to load redux
                dispatch(loginUser({
                  email: document.data().email,
                  displayName: document.data().displayName,
                  profilePicUrl: document.data().photoURL,
                  id: cred.uid
                }))
                console.log("here")
              } else {
                setDoc(doc(db, "caditor-users", cred.uid), {...cred.providerData[0], projects: [], totalProjects: 0})
                .then(() => {
                  dispatch(loginUser({
                    email: cred.providerData[0].email,
                    displayName: cred.providerData[0].displayName,
                    profilePicUrl: cred.providerData[0].photoURL,
                    id: cred.uid
                  }))
                })  
              }
            })
          } catch (error) {
              console.log(error)
          }  
        } else {
          router.push("/signin")
        } 
      })
      return (() => authStatus())
    } catch (error) {
        console.log(error)
    }
 
  }, [router, dispatch])

  return (
    <div>
      <UserData />
      <div>
        <h2>This is your home</h2>
        <p>Your data and settings will appear here</p>
      </div>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  )
}

export default HomeScreen;