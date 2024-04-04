import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db, { auth } from "../config/firebase.config";

export const customSignup = async (
  email: string,
  password: string,
  username: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: username,
  });

  await setDoc(doc(db, "users", user.uid), {
    username,
    email,
  });
};
