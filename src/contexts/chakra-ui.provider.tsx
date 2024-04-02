import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraCustomTheme } from "../UI/chakra-ui/chakra-ui.custom-theme";

export const ChakraUIProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ChakraProvider theme={chakraCustomTheme}>{children}</ChakraProvider>;
};
