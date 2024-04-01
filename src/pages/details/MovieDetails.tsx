import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Flex,
  Text,
  Heading,
  Badge,
  Button,
  VStack,
  HStack,
  Link,
  Container,
  Spinner,
  Alert,
  AlertIcon,
  chakra,
  Divider,
  Tooltip,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  TimeIcon,
  CalendarIcon,
  AtSignIcon,
  StarIcon,
  InfoOutlineIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import { Movietype } from "../../models/movie.types";
import { fetchMovieDetails } from "./movieService";

const ChakraLink = chakra(Link);

const MovieDetail: React.FC = () => {
  const navigate = useNavigate();

  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movietype | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("teal.600", "teal.300");
  const textColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieDetails(Number(movieId));
        setMovie(data);
      } catch (error) {
        setError("Failed to load movie details.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error || "Movie details not available."}
      </Alert>
    );
  }

  return (
    <Container maxW="container.lg" py={2}>
      <VStack spacing={2}>
        <Flex w="full" justifyContent="flex-start">
          <IconButton
            aria-label="Go back"
            icon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          />
        </Flex>
        <Box bg={bgColor} p={6} rounded="lg" shadow="xl">
          <VStack spacing={5}>
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              rounded="lg"
              loading="lazy"
              boxShadow="2xl"
            />

            <Heading color={headingColor} textAlign="center">
              {movie.title}
            </Heading>

            {movie.tagline && (
              <Text fontSize="lg" fontStyle="italic">
                "{movie.tagline}"
              </Text>
            )}

            <HStack wrap="wrap" justify="center" spacing={2}>
              {movie.genres.map((genre) => (
                <Badge key={genre.id} colorScheme="purple">
                  {genre.name}
                </Badge>
              ))}
            </HStack>

            <Text textAlign="justify" color={textColor}>
              {movie.overview}
            </Text>

            <Flex align="center" justify="center">
              <Text fontWeight="bold">
                Rating: {movie.vote_average.toFixed(1)}/10
              </Text>
              <Text ml={2}>({movie.vote_count} votes)</Text>
            </Flex>

            <Divider />

            <VStack spacing={2} alignItems="flex-start">
              <HStack>
                <CalendarIcon />
                <Text>
                  <strong>Release Date:</strong>{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </Text>
              </HStack>

              <HStack>
                <TimeIcon />
                <Text>
                  <strong>Runtime:</strong> {movie.runtime} min
                </Text>
              </HStack>

              <HStack>
                <AtSignIcon />
                <Text>
                  <strong>Language:</strong>{" "}
                  {movie.original_language.toUpperCase()}
                </Text>
              </HStack>

              {movie.budget > 0 && (
                <HStack>
                  <InfoOutlineIcon />
                  <Text>
                    <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                  </Text>
                </HStack>
              )}

              {movie.homepage && (
                <Tooltip label="Visit Homepage" hasArrow>
                  <ChakraLink href={movie.homepage} isExternal>
                    Visit Homepage <ExternalLinkIcon mx="2px" />
                  </ChakraLink>
                </Tooltip>
              )}
            </VStack>

            <Link as={RouterLink} to={`/booking/${movieId}`}>
              <Button colorScheme="teal" size="lg" mt={4}>
                Book Tickets
              </Button>
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default MovieDetail;
