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
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

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
          <Heading mb="6">Log In</Heading>
          <LoginForm />
          <Text mt="4">Don't have an account?</Text>
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;
