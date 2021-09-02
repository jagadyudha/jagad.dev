import React from "react";
import MyNavbar from "./navbar";
import MyFooter from "./footer";
function layout({ children }) {
  return (
    <div>
      <MyNavbar />
      {children}
      <MyFooter />
    </div>
  );
}

export default layout;
