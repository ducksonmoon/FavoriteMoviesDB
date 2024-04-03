import React, { useState } from "react";
import { toggleLike } from "../services/likeService";
import { IconButton, useColorModeValue, Spinner } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
  userId: string;
  movieId: string;
  initialLiked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  userId,
  movieId,
  initialLiked,
}) => {
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [loading, setLoading] = useState<boolean>(false);

  const heartColor = useColorModeValue("red.500", "red.200");

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
