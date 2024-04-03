import React from "react";
import "./App.css";
import Toolbar from "./components/Toolbar";
import SplashScreen from "./components/SplashScreen";
import { LayoutWrapper } from "./contexts/LayoutWrapper";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalProvider from "./contexts/Global.provider";
import useAppInitialization from "./hooks/useAppInitialization";
import AppRoutes from "./components/Routes/AppRoutes";

function App() {
  const isAppReady = useAppInitialization();

  return (
    <Router>
      <GlobalProvider>
        {!isAppReady ? (
          <SplashScreen />
        ) : (
          <LayoutWrapper>
            <AppRoutes />
            <Toolbar />
          </LayoutWrapper>
        )}
      </GlobalProvider>
    </Router>
  );
}

export default App;
