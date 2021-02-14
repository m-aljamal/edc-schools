 import React from "react";
import Header from "./Header";
import Meta from "./Meta";
import Footer from './Footer'
const Container: React.FC = ({ children }) => {
  return (
    <div>
      <Meta />
      <Header />
      {children}
      <Footer/>
    </div>
  );
};

export default Container;
