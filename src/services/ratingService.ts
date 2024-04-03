import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../config/firebase.config";

interface Rating {
  userId: string;
  movieId: string;
  rating: number;
}

export const addOrUpdateRating = async (rating: Rating): Promise<void> => {
  const ratingRef = doc(db, "ratings", `${rating.userId}_${rating.movieId}`);
  await setDoc(ratingRef, rating);
};

export const getRatingsForMovie = async (
  movieId: string
): Promise<Rating[]> => {
  const q = query(collection(db, "ratings"), where("movieId", "==", movieId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as Rating);
};
