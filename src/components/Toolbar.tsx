import React from "react";
import { Flex, Box, IconButton } from "@chakra-ui/react";
import {
  AddIcon,
  SearchIcon,
  HamburgerIcon,
  BellIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

function Toolbar() {
  return (
    <Box
      px={4}
      py={2}
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      backgroundColor="black"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          size="lg"
          variant="ghost"
        />
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          size="lg"
          variant="ghost"
        />

        <IconButton
          aria-label="Settings"
          icon={<SettingsIcon />}
          size="lg"
          variant="ghost"
        />
      </Flex>
    </Box>
  );
}

export default Toolbar;
