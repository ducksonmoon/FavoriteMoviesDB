import React from "react";
import { Flex, Box, IconButton } from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const toolbarItems = [
  { icon: HamburgerIcon, label: "Menu", path: "" },
  { icon: SearchIcon, label: "Search", path: "/search" },
  { icon: SettingsIcon, label: "Settings", path: "/settings" },
];

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
        {toolbarItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <IconButton
              aria-label={item.label}
              icon={<item.icon />}
              size="lg"
              variant="ghost"
            />
          </Link>
        ))}
      </Flex>
    </Box>
  );
}

export default Toolbar;
