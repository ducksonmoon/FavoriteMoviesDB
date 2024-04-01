import React, { useRef, useState } from "react";
import { Box, Image, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";
import { apiEndpoints, defaultOptions } from "../config/api.config";
import { Movietype } from "../models/movie.types";

export interface DiscoverMovie {
  page: number;
  result: Movietype[];
}

const ImageScroller = ({
  title,
  endpoint,
  desc,
}: {
  title: string;
  endpoint: string;
  desc: string;
}) => {
  const [response, isLoading, error] = useFetch<any>(
    apiEndpoints.discover(endpoint),
    defaultOptions
  );
  const [movies, setMovies] = useState([] as Movietype[]);
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
        {title}
      </Heading>
      <Text fontSize="xs" color="gray.400" mb={3}>
        {desc}
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
            <VStack key={index} spacing="5px" align="center">
              <Image
                src={`${process.env.REACT_APP_API_ENDPOINT_W500}${movie.poster_path}`}
                objectFit="cover"
                h="100%"
                w="100%"
                borderRadius="5px"
                alt={`Poster of the movie/tvshow titled ${movie.title}`}
              />
              <Text fontSize="sm" noOfLines={1} w="120px" textAlign="center">
                {movie.name || movie.title}
              </Text>
            </VStack>
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default ImageScroller;
