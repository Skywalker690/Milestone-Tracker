import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MilestoneTracker from "./components/MilestoneTracker";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";

function App() {
  React.useEffect(() => {
    // Set dark theme by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="App dark">
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
              <Navbar />
              <Routes>
                <Route path="/" element={<MilestoneTracker />} />
              </Routes>
            </div>
          </ProtectedRoute>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </div>
  );
}

export default App;