import { CommentType, addComment } from "../commentsService";
import {
  getOfflineReviews,
  removeOfflineReview,
} from "./offlineStorageService";

export const syncOfflineData = async () => {
  console.log("Checking for offline data to sync...");
  const unsyncedReviews = await getOfflineReviews();
  if (unsyncedReviews.length > 0) {
    unsyncedReviews.forEach(async (review: CommentType) => {
      try {
        await addComment(review);
        await removeOfflineReview(review.id);
      } catch (error) {
        console.error("Error syncing review:", review.id, error);
      }
    });
  }
};
