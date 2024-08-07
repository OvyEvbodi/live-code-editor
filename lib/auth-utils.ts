import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/config/firebase.config";

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  const credentials = await signInWithPopup(auth, googleProvider);
};

export const handleSignOut = async () => {
  signOut(auth)
    .catch((error) => {
    console.log(error)
  });
};

export const signInWithGithub = async () => {
  const githubProvider = new GithubAuthProvider();
  signInWithPopup(auth, githubProvider)
  .then((result) => {
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
  });
};
