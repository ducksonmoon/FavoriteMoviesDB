import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import HeaderToolbar from "./components/toolbar/Header";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderToolbar />
      </header>
      <Home />
    </div>
  );
}

export default App;
