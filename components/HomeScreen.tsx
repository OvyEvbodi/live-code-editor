"use client"

import { auth, db } from "@/config/firebase.config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { handleSignOut } from "@/lib/auth-utils";
import { doc, setDoc } from "firebase/firestore";
import { loginUser } from "@/redux/user.slice";
import { useDispatch } from "react-redux";


const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const authStatus = auth.onAuthStateChanged(cred => {
      if (cred) {
        // console.log(cred?.providerData[0].email)
        setDoc(doc(db, "caditor-users", cred.uid), cred.providerData[0])
        .then(() => {
          // redux
          // console.log(cred.providerData)
          dispatch(loginUser({
            email: cred.providerData[0].email,
            displayName: cred.providerData[0].displayName,
            profilePicUrl: cred.providerData[0].photoURL,
            id: cred.providerData[0].uid
          }))
        })
      } else {
        router.push("/signin")
      }
    })
    return (() => authStatus())
  }, [router, dispatch])

  return (
    <div>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  )
}

export default HomeScreen;