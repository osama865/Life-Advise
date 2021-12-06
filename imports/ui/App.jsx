import React, { useEffect, useState } from "react";
import FetchSavedAdvises from "./fetchSavedAdvises";
import FetchOneAdvise from "./fetchOneAdvise";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./404";
import FetchAllAdvises from "./fetchAllAdvises";
export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/saved" element={<FetchSavedAdvises />} />
          <Route exact path="/random" element={<FetchOneAdvise />} />
          <Route exact path="/all" element={<FetchAllAdvises />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};