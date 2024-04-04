import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  useColorModeValue,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import RatingComponent from "./RatingComponent";
import LikeButton from "./LikeButton";
import { FormField } from "./FormFieldComponent";
import { CommentType, addComment } from "../services/commentsService";
import { useAuth } from "../contexts/AuthContext";

const useReviewForm = (onClose: any, comment: CommentType) => {
  const toast = useToast();

  const handleSubmit = (text: string) => {
    comment.comment = text;
    addComment(comment);
    toast({
      title: "Review submitted.",
      description: "Your review has been added successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };

  return { handleSubmit };
};

const ReviewForm = ({ movieId, onClose }: any) => {
  const { currentUser } = useAuth();
  const toast = useToast();
  const [reviewText, setReviewText] = useState("");
  const [dateWatched, setDateWatched] = useState("");
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const { handleSubmit } = useReviewForm(onClose, {
    id: uuidv4(),
    comment: reviewText,
    movieId: movieId,
    userId: currentUser?.uid,
    userName: currentUser?.displayName || "Anonymous",
    datePosted: new Date(),
  });

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!reviewText.trim()) {
      toast({
        title: "Cannot publish review",
        description: "Please write a review before publishing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    handleSubmit(reviewText);
  };

  return (
    <Modal isOpen={true} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent bg={formBackground} borderRadius="lg">
        <ModalHeader>Write Your Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <FormField
              label="Date Watched"
              type="date"
              value={dateWatched}
              onChange={(e: any) => setDateWatched(e.target.value)}
            />
            <RatingAndLike movieId={movieId} />
            <FormField
              label="Review"
              type="textarea"
              value={reviewText}
              onChange={(e: any) => setReviewText(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSubmit}>
            Publish
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const RatingAndLike = ({ movieId }: { movieId: string }) => (
  <Flex align="center" justify="center" mt={4}>
    <RatingComponent userId="userId" movieId={movieId} />
    <LikeButton userId="someUserId" movieId={movieId} />
  </Flex>
);

export default ReviewForm;
