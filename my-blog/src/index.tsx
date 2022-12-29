import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// 或者是!表示非null断言，要不然会报错:
// 类型“HTMLElement | null”的参数不能赋给类型“Element | DocumentFragment”的参数
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
