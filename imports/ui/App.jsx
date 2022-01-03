import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import FetchSavedAdvises from "./components/fetch-saved";
import FetchOneAdvise from "./components/random";
import NotFound from "./components/404";
import FetchAllAdvises from "./components/all";
import Navbar from "./components/navbar";
import Offline from "./components/offline";
export const App = () => {
  const [online, setOnline] = useState(navigator.onLine);
  window.addEventListener("online", () => {
    console.log("online");
    setOnline(true);
  });
  window.addEventListener("offline", () => {
    console.log("offline");
    setOnline(false);
    window.location.href = "#no-internet";
  });
  return (
    <>
      {online === false && <Offline />}
      <Offline />
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
