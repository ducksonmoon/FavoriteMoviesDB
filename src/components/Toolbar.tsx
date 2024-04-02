import React from "react";
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { FaSearch, FaBars, FaCog } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const toolbarItems = [
  { icon: FaBars, label: "Menu", path: "/" },
  { icon: FaSearch, label: "Search", path: "/search" },
  { icon: FaCog, label: "Settings", path: "/settings" },
];

function Toolbar() {
  const backgroundColor = useColorModeValue("gray.100", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBgColor = useColorModeValue("gray.200", "gray.700");
  const location = useLocation();
  const hideOnRoutes = ["/login", "/register"];

  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <Box
      px={4}
      py={2}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      width="full"
      backgroundColor={backgroundColor}
      boxShadow="0 -2px 10px 0 rgba(0,0,0,0.05)"
      borderTop="1px solid"
      borderColor={borderColor}
      zIndex="banner"
    >
      <Flex justifyContent="space-between" alignItems="center">
        {toolbarItems.map((item, index) => (
          <Tooltip label={item.label} key={index} hasArrow placement="top">
            <Link to={item.path}>
              <IconButton
                icon={React.createElement(item.icon, { size: "20px" })}
                aria-label={item.label}
                size="lg"
                variant="ghost"
                color="current"
                _hover={{ backgroundColor: hoverBgColor }}
              />
            </Link>
          </Tooltip>
        ))}
      </Flex>
    </Box>
  );
}

export default Toolbar;
