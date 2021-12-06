import React from "react";
import { Routes, Route } from "react-router-dom";
import FetchSavedAdvises from "./components/fetchSavedAdvises";
import FetchOneAdvise from "./components/fetchOneAdvise";
import NotFound from "./components/404";
import FetchAllAdvises from "./components/fetchAllAdvises";
import Navbar from "./components/navbar";
export const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/saved" element={<FetchSavedAdvises />} />
        <Route exact path="/random" element={<FetchOneAdvise />} />
        <Route exact path="/all" element={<FetchAllAdvises />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
