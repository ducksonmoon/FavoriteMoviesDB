import React from "react";
import "./App.css";
import Toolbar from "./components/Toolbar";
import { ChakraUIProvider } from "./chakra-ui/chakra-ui.provider";
import { LayoutWrapper } from "./UI/LayoutWrapper";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routesConfig from "./config/routesConfig";

const AppRoutes = () => {
  const routes = useRoutes(routesConfig);
  return routes;
};

function App() {
  return (
    <ChakraUIProvider>
      <LayoutWrapper>
        <Router>
          <AppRoutes />
          <Toolbar />
        </Router>
      </LayoutWrapper>
    </ChakraUIProvider>
  );
}

export default App;
