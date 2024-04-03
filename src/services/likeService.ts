import { doc, setDoc, deleteDoc } from "firebase/firestore";
import db from "../config/firebase.config";

export const toggleLike = async (
  userId: string,
  movieId: string,
  liked: boolean
): Promise<void> => {
  const likeRef = doc(db, "likes", `${userId}_${movieId}`);
  if (liked) {
    await setDoc(likeRef, { userId, movieId });
  } else {
    await deleteDoc(likeRef);
  }
};
