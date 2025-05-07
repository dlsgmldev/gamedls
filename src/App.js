import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Question from "./pages/QuestionLadder/question";
import Leadership from "./pages/GameDLS/leadership";
import ServiceExcellence from "./pages/GameDLS/service-excellence";
import Sales from "./pages/GameDLS/sales";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VSH from "./pages/Games/vsh";
import NHIE from "./pages/Games/nhie";

const App = () => (
  <BrowserRouter>
    <Routes>
    <Route path="/question" element={<Question />} />
    <Route path="/leadership" element={<Leadership />} />
    <Route path="/service-excellence" element={<ServiceExcellence />} />
    <Route path="/sales" element={<Sales />} />
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
