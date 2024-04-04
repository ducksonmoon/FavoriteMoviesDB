import React, { useState, useEffect } from "react";
import {
  addOrUpdateRating,
  getRatingsForMovie,
} from "../services/ratingService";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface RatingComponentProps {
  userId: string;
  movieId: string;
}

const RatingComponent: React.FC<RatingComponentProps> = ({
  userId,
  movieId,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      const ratings = await getRatingsForMovie(movieId);
      const userRating = ratings.find((r) => r.userId === userId);
      if (userRating) {
        setRating(userRating.rating);
      }
    };
    fetchRating();
  }, [userId, movieId]);

  const handleRatingChange = async (newRating: number) => {
    await addOrUpdateRating({ userId, movieId, rating: newRating });
    setRating(newRating);
  };

  return (
    <Flex align="center" justify="center">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Box
            key={index}
            as="button"
            mx={1}
            fontSize="xl"
            color={index <= (hover || rating) ? "yellow.500" : "gray.400"}
            _hover={{ color: "yellow.600" }}
            onClick={() => handleRatingChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            role="presentation"
            aria-label={`Rate ${index} out of 5 stars`}
          >
            <Icon as={FaStar} />
          </Box>
        );
      })}
    </Flex>
  );
};

export default RatingComponent;
