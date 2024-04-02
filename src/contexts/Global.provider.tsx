import React, { ReactNode } from "react";
import { ChakraUIProvider } from "./chakra-ui.provider";
import { AuthProvider } from "./AuthContext";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <ChakraUIProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraUIProvider>
  );
};

export default GlobalProvider;
