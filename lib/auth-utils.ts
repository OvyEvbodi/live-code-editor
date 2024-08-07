import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase.config";

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  const credentials = await signInWithPopup(auth, googleProvider);
  // window.location.reload();
  console.log(credentials);
};
