import React, { useState } from "react";
import { Box, Image, Button, Flex } from "@chakra-ui/react";

const images = [
  "https://via.placeholder.com/600x400/0000FF/808080?Text=First+Image",
  "https://via.placeholder.com/600x400/008000/FFFFFF?Text=Second+Image",
  "https://via.placeholder.com/600x400/FF0000/FFFFFF?Text=Third+Image",
];

function PhotoSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startTouch, setStartTouch] = useState(null);

  const goToPrevious = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentImageIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    // @ts-ignore
    setStartTouch(touch.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startTouch) {
      return;
    }

    const currentTouch = e.touches[0];
    const diff = startTouch - currentTouch.clientX;

    if (diff > 50) {
      goToNext();
      setStartTouch(null);
    } else if (diff < -50) {
      goToPrevious();
      setStartTouch(null);
    }
  };

  return (
    <Box
      height="150px"
      mx="auto"
      overflow="hidden"
      position="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <Image src={images[currentImageIndex]} width="100%" />
      <Flex
        justifyContent="space-between"
        position="absolute"
        top="50%"
        width="100%"
        px={2}
        transform="translateY(-50%)"
      ></Flex>
    </Box>
  );
}

export default PhotoSlider;
