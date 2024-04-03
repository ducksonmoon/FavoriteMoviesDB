import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Image, Flex, Icon, Text, Heading } from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";
import { apiEndpoints, defaultOptions } from "../services/config/api.config";
import { API_ENDPOINTS } from "../services/config/endpoints";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const slideIntervalTime = 5000;

const PhotoSlider: React.FC = () => {
  const navigate = useNavigate();
  const [startTouch, setStartTouch] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [response, isLoading, error] = useFetch<any>(
    apiEndpoints.fetchList(API_ENDPOINTS.PopularMovies),
    defaultOptions
  );
  const movies = response?.results ?? [];

  const changeSlide = useCallback(
    (direction: "next" | "prev") => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex =
          direction === "next"
            ? (prevIndex + 1) % movies?.length
            : (prevIndex + movies?.length - 1) % movies?.length;
        return newIndex;
      });
    },
    [movies?.length]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide("next");
    }, slideIntervalTime);

    return () => clearInterval(interval);
  }, [changeSlide, currentImageIndex]);

  const handleNavigateToDetailPage = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!movies?.length) return <div>No movies found</div>;

  const currentMovie = response.results[currentImageIndex];

  return (
    <Box
      height="250px"
      mx="auto"
      overflow="hidden"
      position="relative"
      bg="black"
      onTouchStart={(e) => setStartTouch(e.touches[0].clientX)}
      onTouchMove={(e) => {
        if (!startTouch) return;
        const touchDiff = startTouch - e.touches[0].clientX;
        if (touchDiff > 50 || touchDiff < -50) {
          changeSlide(touchDiff > 50 ? "next" : "prev");
          setStartTouch(null);
        }
      }}
    >
      <Image
        src={`${process.env.REACT_APP_API_ENDPOINT_W500}${currentMovie.backdrop_path}`}
        alt={`Movie title: ${currentMovie.title}`}
        fit="cover"
        w="full"
        h="full"
        onClick={() => handleNavigateToDetailPage(currentMovie.id)}
        cursor="pointer"
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
          onClick={() => changeSlide("prev")}
          aria-label="Previous image"
        />
        <Icon
          as={ChevronRightIcon}
          w={8}
          h={8}
          color="white"
          cursor="pointer"
          onClick={() => changeSlide("next")}
          aria-label="Next image"
        />
      </Flex>
      <Box
        position="absolute"
        bottom="4"
        left="4"
        color="white"
        bg="blackAlpha.600"
        p={2}
        onClick={() => handleNavigateToDetailPage(currentMovie.id)}
        cursor="pointer"
      >
        <Text fontSize="lg" noOfLines={1}>
          {currentMovie.title}
        </Text>
        <Heading fontSize="md" color="yellow">
          {Math.round(currentMovie.vote_average * 10) / 10}
        </Heading>
      </Box>
    </Box>
  );
};

export default PhotoSlider;
