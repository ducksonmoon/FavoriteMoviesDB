import React, { useRef, useState } from "react";
import { Box, Image, HStack, Heading, Text } from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";
import { apiEndpoints, defaultOptions } from "../config/api.config";
import { Movie } from "../models/movie.types";

export interface DiscoverMovie {
  page: number;
  result: Movie[];
}

const ImageScroller = () => {
  const [response, isLoading, error] = useFetch<any>(
    apiEndpoints.discoverMovie(),
    defaultOptions
  );
  const [movies, setMovies] = useState([] as Movie[]);
  const [startX, setStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);
  const scrollerRef = useRef(null);

  React.useEffect(() => {
    if (response?.results) {
      setMovies(response.results);
    }
  }, [response]);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
          {movies?.map((movie, index) => (
            <Image
              key={index}
              src={process.env.REACT_APP_API_ENDPOINT_W500 + movie.poster_path}
              boxSize="150px"
              objectFit="cover"
            />
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default ImageScroller;
