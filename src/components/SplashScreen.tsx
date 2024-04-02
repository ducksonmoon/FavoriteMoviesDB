import React from "react";
import { Box, CircularProgress, Text, VStack, Image } from "@chakra-ui/react";

const SplashScreen = () => (
  <Box
    position="fixed"
    top="0"
    left="0"
    width="100vw"
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    zIndex="overlay"
  >
    <VStack spacing={4}>
      <CircularProgress isIndeterminate color="blue.300" />
      <Text fontSize="xl">Loading...</Text>
    </VStack>
  </Box>
);

export default SplashScreen;
