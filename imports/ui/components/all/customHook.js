import React, { useCallback, useRef, useState } from "react";
import { Meteor } from "meteor/meteor";

export default function customHook() {
  const [result, setResult] = useState([]);
  let skip = 0;
  const observer = useRef();
  const last = useCallback(
    (node) => {
      console.log("lllllllllll");
      if (observer.current) observer.current.disconnect();
      // declare a new observer and check if it is interscting or appeared in the view
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("intersected");
          skip = skip + 10;
          console.log(skip);
          Meteor.call("fetchByScroll", skip, (err, res) => {
            setResult(res);
            // good i got'em
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    // whenever these deps changes , run the callback
    [skip]
  );

  return { last, result };
}
