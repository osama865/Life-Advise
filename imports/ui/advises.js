import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import Advise from "./Advise";

// fetch only en advice
// fetch only ar advice
// assemble'em in one object
// render the new object
export default function Advises() {
  const [advises, setAdvises] = useState([]);
  const [ar, setAr] = useState([]);
  const [en, setEn] = useState([]);
  const languages = { en: "fetchEnglishAdvises", ar: "fetchArabicAdvises" };
  useEffect(() => {}, []);

  /**
  |--------------------------------------------------
  | const arr = {
    ar: [],
    en: [],
    mixed : []
  };
  for (let i = 0; i < ar.length; i++) {
      arr.en.push(en[i])
      arr.ar.push(ar[i])
      arr.mixed.push(en[i],ar[i])
  }
  console.log(arr);Meteor.call("fetchEnglishAdvises", (err, res) => {
      if (err) throw new Error(err);
      setEn(res);
      console.log(res.length);
    });
    Meteor.call("fetchArabicAdvises", (err, res) => {
      if (err) throw new Error(err);
      setAr(res);
      console.log(res.length);
    });
      {arr.mixed?.map((advise, i) => {
        return <Advise advise={advise} key={i} />;
      })}
  |--------------------------------------------------
  */

  return (
    <div>
    </div>
  );
}
