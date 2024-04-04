import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../config/firebase.config";

export interface CommentType {
  id: string;
  userId: string | undefined;
  userName: string | null | undefined;
  movieId: string;
  comment: string;
  datePosted: Date;
}

export const addComment = async (comment: CommentType): Promise<void> => {
  const ratingRef = doc(db, "comments", `${comment.userId}_${comment.id}`);
  await setDoc(ratingRef, comment);
};

export const getCommentsForMovie = async (
  movieId: string
): Promise<CommentType[]> => {
  const q = query(collection(db, "comments"), where("movieId", "==", movieId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as CommentType);
};
