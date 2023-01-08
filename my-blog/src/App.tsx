import React from "react";
import HeaderNav from "./layout/HeaderNav";
import Main from "./layout/Main";
import Footer from "./layout/Footer";
import BackToTop from "./components/BackToTop";
import Search from "./components/Search";
import "./App.styl";
import { ConfigProvider } from "antd";
const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f1b3be",
          colorPrimaryHover: "#ffc0cb",
          controlOutline: "#ffeaed",
          fontFamily: "myFont",
        },
      }}
    >
      <div className="app">
        <HeaderNav />
        <Main />
        <Footer />
        <Search />
        <BackToTop />
      </div>
    </ConfigProvider>
  );
};
export default App;
