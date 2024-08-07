import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/config/firebase.config";

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  const credentials = await signInWithPopup(auth, googleProvider);
  // window.location.reload();
  // console.log(credentials);
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
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;

    // The signed-in user info.
    const user = result.user;
    // console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
  

};
