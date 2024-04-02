import React, { useContext, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Switch,
  FormLabel,
  FormControl,
  Input,
  Button,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const UserSettings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleSaveSettings = async () => {
    try {
      // Replace this with actual API call to save settings
      console.log("Saving settings...");
      toast({
        title: "Settings saved.",
        description: "We've updated your settings.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error saving settings.",
        description: "Unable to save settings at this time.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged out successfully.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  // if (!isAuthenticated) {
  //   navigate("/login");
  //   return null;
  // }

  return (
    <Box p={5}>
      <VStack spacing={4} align="flex-start">
        <Heading as="h2" size="xl">
          User Settings
        </Heading>

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark-mode" mb="0">
            Dark Mode
          </FormLabel>
          <Switch
            id="dark-mode"
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="notifications" mb="0">
            Enable Notifications
          </FormLabel>
          <Switch
            id="notifications"
            isChecked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </FormControl>

        <Button colorScheme="teal" onClick={handleSaveSettings}>
          Save Settings
        </Button>
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default UserSettings;
