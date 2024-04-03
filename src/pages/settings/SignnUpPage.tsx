import React from "react";
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  useColorModeValue,
  Text,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"; // If using React Router for navigation
import SignUpForm from "../../components/Auth/SignUpForm"; // Ensure you have this component created

const SignUpPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Container centerContent>
      <IconButton
        aria-label="Toggle Theme"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        position="absolute"
        top={5}
        right={5}
      />
      <Box
        width="100%"
        maxW="md"
        p="8"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={formBackground}
        boxShadow="sm"
        mt="20vh"
      >
        <VStack spacing={5}>
          <Heading mb="6">Sign Up</Heading>
          <SignUpForm />
          <Text>Already have an account?</Text>
          <Button
            colorScheme="blue"
            variant="link"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default SignUpPage;
