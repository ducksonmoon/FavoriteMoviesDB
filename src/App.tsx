import React from "react";

import "./App.css";
import Toolbar from "./components/Toolbar";
import SettingsPage from "./pages/settings/Settings";
import Home from "./pages/home/Home";
import { ChakraUIProvider } from "./chakra-ui/chakra-ui.provider";

function App() {
  return (
    <ChakraUIProvider>
      <Home />
      {/* <SettingsPage /> */}
      <Toolbar />
    </ChakraUIProvider>
  );
}

export default App;
