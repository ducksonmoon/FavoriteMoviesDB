import { addDoc, collection } from "firebase/firestore";
import db from "../../config/firebase.config";

interface List {
  userId: string;
  listName: string;
}

interface ListMovie {
  listId: string;
  movieId: string;
}

export const createList = async (list: List): Promise<void> => {
  await addDoc(collection(db, "lists"), list);
};

export const addMovieToList = async (listMovie: ListMovie): Promise<void> => {
  await addDoc(collection(db, "listMovies"), listMovie);
};
