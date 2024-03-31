import React from "react";
import {
  Input,
  Box,
  useColorModeValue,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const FloatingSearchBar = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      position="fixed"
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      p="4"
      bgColor={bgColor}
      boxShadow="md"
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      width="auto"
      maxWidth="600px"
      zIndex="10"
    >
      <InputGroup>
        <Input placeholder="Search..." />
        <InputRightElement>
          <IconButton
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={() => console.log("Search")}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default FloatingSearchBar;
