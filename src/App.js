import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VSH from "./pages/Games/vsh";
import NHIE from "./pages/Games/nhie";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/vsh/:id/:id2" element={<VSH />} />
        <Route path="/nhie/:id" element={<NHIE />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
