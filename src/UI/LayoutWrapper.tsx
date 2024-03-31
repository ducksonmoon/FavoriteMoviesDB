import React from "react";
import { Box } from "@chakra-ui/react";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box px={{ base: "4", md: "8" }} pb="70px" pt="2">
      {children}
    </Box>
  );
};
