import localforage from "localforage";
import { CommentType } from "../commentsService";

const store = localforage.createInstance({
  name: "app",
  storeName: "offlineReviews",
});

export const saveReviewOffline = async (review: CommentType) => {
  await store.setItem(review.id, review);
};

export const getOfflineReviews = async () => {
  const reviews: CommentType[] = [];
  await store.iterate((value: CommentType, key: any, iterationNumber: any) => {
    reviews.push(value);
  });
  return reviews;
};

export const removeOfflineReview = async (id: string) => {
  await store.removeItem(id);
};
