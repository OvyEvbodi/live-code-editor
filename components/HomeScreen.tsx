"use client"

import { auth, db } from "@/config/firebase.config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authSignOut } from "@/lib/auth-utils";
import { doc, setDoc } from "firebase/firestore";
import { loginUser, signoutUser } from "@/redux/user.slice";
import { useDispatch } from "react-redux";
import UserData from "@/app/projects/components/UserData";


const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signoutUser())
    console.log("out")
    authSignOut()
  };

  useEffect(() => {
    try {
      const authStatus = auth.onAuthStateChanged(cred => {
        if (cred) {
          // console.log(cred?.providerData[0].email)
          setDoc(doc(db, "caditor-users", cred.uid), {...cred.providerData[0], projects: []})
          .then(() => {
            // redux
            // console.log(cred.providerData)
            dispatch(loginUser({
              email: cred.providerData[0].email,
              displayName: cred.providerData[0].displayName,
              profilePicUrl: cred.providerData[0].photoURL,
              id: cred.uid
            }))
          })
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
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  )
}

export default HomeScreen;