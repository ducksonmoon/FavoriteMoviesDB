import React, { useState } from "react";
import { Box, Image, Flex, Icon, Text, Heading } from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";
import { apiEndpoints, defaultOptions } from "../config/api.config";
import { API_ENDPOINTS } from "../config/endpoints";
import { Movie } from "../models/movie.types";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function PhotoSlider() {
  const [response, isLoading, error] = useFetch<any>(
    apiEndpoints.fetchList(API_ENDPOINTS.PopularMovies),
    defaultOptions
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startTouch, setStartTouch] = useState(null);
  const [movies, setMovies] = useState([] as Movie[]);

  const goToPrevious = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? movies.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentImageIndex === movies.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  React.useMemo(() => {
    if (response?.results) {
      setMovies(response.results);
    }
  }, [response]);

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

  const round = function (num: number) {
    return Math.round(num * 10 + Number.EPSILON) / 10;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box
      height="250px"
      mx="auto"
      overflow="hidden"
      position="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      bg="black"
    >
      <Image
        src={
          process.env.REACT_APP_API_ENDPOINT_W500 +
          movies[currentImageIndex]?.backdrop_path
        }
        alt={`Movie title: ${movies[currentImageIndex]?.title}`}
        fit="cover"
        w="full"
        h="full"
      />
      <Flex
        justifyContent="space-between"
        position="absolute"
        top="0"
        width="100%"
        height="100%"
        p={4}
        alignItems="center"
      >
        <Icon
          as={ChevronLeftIcon}
          w={8}
          h={8}
          color="white"
          cursor="pointer"
          onClick={goToPrevious}
        />
        <Icon
          as={ChevronRightIcon}
          w={8}
          h={8}
          color="white"
          cursor="pointer"
          onClick={goToNext}
        />
      </Flex>
      <Box
        position="absolute"
        bottom="4"
        left="4"
        color="white"
        bg="blackAlpha.600"
        p={2}
      >
        <Text fontSize="lg">{movies[currentImageIndex]?.title}</Text>
        <Heading fontSize="md" color="yellow">
          {round(movies[currentImageIndex]?.vote_average)}
        </Heading>
      </Box>
    </Box>
  );
}

export default PhotoSlider;
