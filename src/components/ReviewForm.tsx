import React from "react";
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
import RatingComponent from "./RatingComponent";
import LikeButton from "./LikeButton";
import { FormField } from "./FormFieldComponent";

const useReviewForm = (onClose: any) => {
  const toast = useToast();

  const handleSubmit = () => {
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
  const { handleSubmit } = useReviewForm(onClose);
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Modal isOpen={true} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent bg={formBackground} borderRadius="lg">
        <ModalHeader>Write Your Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <FormField label="Date Watched" type="date" />
            <RatingAndLike movieId={movieId} />
            <FormField label="Review" type="textarea" />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
    <LikeButton userId="someUserId" movieId={movieId} initialLiked={false} />
  </Flex>
);

export default ReviewForm;
