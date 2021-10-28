import React from "react";

export default function Advise({ advise }) {
  return (
    <>
      <h2>{advise.text}</h2>
      <h4>{advise.source}</h4>
      <h5>{advise.date.toUTCString()}</h5>
      <h5>{advise._id || ""}</h5>
    </>
  );
}
