import React, { useRef, useState } from "react";
import { Box, Image, HStack, Heading, Text } from "@chakra-ui/react";

const movieCovers = [
  "https://via.placeholder.com/200x300/0000FF/808080?Text=Movie+1",
  "https://via.placeholder.com/200x300/008000/FFFFFF?Text=Movie+2",
  "https://via.placeholder.com/200x300/FF0000/FFFFFF?Text=Movie+3",
  "https://via.placeholder.com/200x300/FF0000/FFFFFF?Text=Movie+3",
  "https://via.placeholder.com/200x300/FF0000/FFFFFF?Text=Movie+3",
];

const ImageScroller = () => {
  const [startX, setStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);
  const scrollerRef = useRef(null);

  const onScrollStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    // @ts-ignore
    setScrollStartX(scrollerRef.current?.scrollLeft);
  };

  const onScrollMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const moveX = touch.clientX - startX;
    if (scrollerRef.current) {
      // @ts-ignore
      scrollerRef.current.scrollLeft = scrollStartX - moveX;
    }
  };

  return (
    <>
      <Heading size="md" mt={8}>
        Featured today
      </Heading>
      <Text fontSize="xs" color="gray.400" mb={3}>
        New and Upcoming Prequels, Sequels, and Spin-Offs
      </Text>
      <Box
        overflowX="auto"
        w="full"
        css={{
          WebkitOverflowScrolling: "touch" /* for smooth scrolling on iOS */,
        }}
        onTouchStart={onScrollStart}
        onTouchMove={onScrollMove}
        ref={scrollerRef}
      >
        <HStack spacing="20px">
          {movieCovers.map((cover, index) => (
            <Image key={index} src={cover} boxSize="150px" objectFit="cover" />
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default ImageScroller;
