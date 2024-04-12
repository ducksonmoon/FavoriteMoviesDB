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
  InfoOutlineIcon,
  ArrowBackIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { Movietype } from "../models/movie.types";
import { fetchMovieDetails } from "../services/Interaction/movieService";
import ReviewForm from "../components/Interaction/ReviewForm";
import Comment from "../components/Interaction/Comment";
import {
  CommentType,
  getCommentsForMovie,
} from "../services/Interaction/commentsService";

const ChakraLink = chakra(Link);

const MovieDetail: React.FC = () => {
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movietype | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("teal.600", "teal.300");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const toggleReviewForm = () => setShowReviewForm(!showReviewForm);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieDetails(Number(movieId));
        const commentsData = await getCommentsForMovie(movieId as string);
        setMovie(data);
        setComments(commentsData);

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
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <IconButton
            aria-label="Go back"
            icon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          />
          <Tooltip
            hasArrow
            label="Click to write a review for this movie"
            placement="top"
          >
            <Button
              leftIcon={<EditIcon />}
              colorScheme="gray"
              variant="solid"
              size="md"
              boxShadow="md"
              _hover={{
                bg: "blue.500",
                transform: "scale(1.05)",
              }}
              _active={{
                bg: "blue.600",
                transform: "scale(1)",
              }}
              onClick={toggleReviewForm}
            >
              Write Review
            </Button>
          </Tooltip>
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

            {showReviewForm && (
              <ReviewForm
                movieId={movieId as string}
                onClose={toggleReviewForm}
              />
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
      <>
        <Divider my={5} />
        <Heading size="lg" mb={4}>
          Comments
        </Heading>
        <VStack spacing={4} align="stretch">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <Text>No comments yet.</Text>
          )}
        </VStack>
      </>
    </Container>
  );
};

export default MovieDetail;
