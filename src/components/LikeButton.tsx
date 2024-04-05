import React, { useState } from "react";
import { getLikesForMovie, toggleLike } from "../services/likeService";
import { IconButton, useColorModeValue, Spinner } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
  userId: string;
  movieId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ userId, movieId }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const heartColor = useColorModeValue("red.500", "red.200");

  React.useEffect(() => {
    const fetchRating = async () => {
      const likes = await getLikesForMovie(movieId);
      const userLikes = likes.find(
        (r) => r?.userId === userId && r.movieId === movieId
      );
      if (userLikes) {
        setLiked(true);
      }
    };
    fetchRating();
  }, [userId, movieId]);

  const handleClick = async () => {
    setLoading(true);
    await toggleLike(userId, movieId, !liked);
    setLiked(!liked);
    setLoading(false);
  };

  return (
    <IconButton
      aria-label={liked ? "Unlike movie" : "Like movie"}
      icon={
        loading ? (
          <Spinner size="sm" />
        ) : liked ? (
          <FaHeart color={heartColor} />
        ) : (
          <FaRegHeart />
        )
      }
      onClick={handleClick}
      variant="ghost"
      size="lg"
      _hover={{
        transform: "scale(1.1)",
      }}
      transition="transform 0.2s ease-in-out"
    />
  );
};

export default LikeButton;
