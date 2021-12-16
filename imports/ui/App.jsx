import React from "react";
import { Routes, Route } from "react-router-dom";
import FetchSavedAdvises from "./components/fetch-saved";
import FetchOneAdvise from "./components/random";
import NotFound from "./components/404";
import FetchAllAdvises from "./components/all";
import Navbar from "./components/navbar";
export const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/saved" element={<FetchSavedAdvises />} />
        <Route exact path="/random" element={<FetchOneAdvise />} />
        <Route exact path="/" element={<FetchOneAdvise />} />
        <Route exact path="/all" element={<FetchAllAdvises />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
