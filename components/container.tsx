import React from "react";
import Header from "./Header";
import Meta from "./Meta";

const Container: React.FC = ({ children }) => {
  return (
    <div>
      <Meta />
      <Header />
      {children}
    </div>
  );
};

export default Container;
