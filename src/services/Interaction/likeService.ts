import {
  doc,
  setDoc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../../config/firebase.config";

interface Like {
  movieId: string;
  userId: string;
}

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

export const getLikesForMovie = async (movieId: string): Promise<Like[]> => {
  const q = query(collection(db, "likes"), where("movieId", "==", movieId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as Like);
};
