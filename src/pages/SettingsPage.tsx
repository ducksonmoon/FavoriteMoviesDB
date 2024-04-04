import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const UserSettings = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const [email, setEmail] = useState(currentUser?.email || "");
  const [username, setUsername] = useState(currentUser?.displayName || "");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setEmail(user?.email || "");
      setUsername(user?.displayName || "");
    });

    return () => unsubscribe();
  }, []);

  const handleSaveSettings = async () => {
    try {
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

  return (
    <Box p={5}>
      <VStack spacing={4} align="flex-start">
        <Heading as="h2" size="xl">
          User Settings
        </Heading>

        <IconButton
          aria-label="Toggle Theme"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          alignSelf="flex-end"
        />

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="name" value={username} isReadOnly={true} />{" "}
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} isReadOnly={true} />{" "}
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="notifications" mb="0">
            Enable Notifications
          </FormLabel>
          <Switch
            disabled={true}
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
