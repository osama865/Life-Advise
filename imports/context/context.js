import React, { createContext, useState } from "react";
const advisesContext = createContext();
// must change this dumb name
function Context({ children }) {
    const [toggle, setToggle] = useState(true)
    const useToggle = () => {
        setToggle(!toggle)
        //console.log(toggle);
        return toggle
    }
  return <advisesContext.Provider children={children} value={{useToggle}} />;
}
export {advisesContext , Context};
