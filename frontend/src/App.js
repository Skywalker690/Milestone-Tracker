import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MilestoneTracker from "./components/MilestoneTracker";
import { Toaster } from "./components/ui/toaster";

function App() {
  useEffect(() => {
    // Set dark theme by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="App dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MilestoneTracker />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;