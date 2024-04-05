import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  VStack,
  Container,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { useDebounce } from "../hooks/useDebounce";
import { fetchMoviesBySearch } from "../services/Interaction/movieService";
import { Movietype } from "../models/movie.types";
import { usePreserveState } from "../hooks/usePreserveState";

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = usePreserveState("", "searchTerm");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [movies, setMovies] = useState([] as Movietype[]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      fetchMoviesBySearch(debouncedSearchTerm)
        .then(setMovies)
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    } else {
      setMovies([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={4}>
        <Heading as="h1">Search Movies</Heading>
        <Input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={4} w="full">
            {movies.map((movie) => (
              <Box
                key={movie.id}
                p={2}
                shadow="md"
                borderWidth="1px"
                rounded="lg"
                _hover={{ shadow: "xl" }}
                cursor="pointer"
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  rounded="md"
                  loading="lazy"
                />
                <Text mt={2} fontWeight="bold" textAlign="center">
                  {movie.title}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        )}
        {movies.length === 0 && !isLoading && <Text>No results found.</Text>}
      </VStack>
    </Container>
  );
};

export default SearchPage;
