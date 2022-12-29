import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import s from "./index.module.styl"; //也可以直接写类名，不用导入
import ErrorBoundary from "components/ErrorBoundary";
import { Spin } from "antd";

const Home = lazy(() => import("@/pages/Home"));
const Classes = lazy(() => import("@/pages/Classes"));
const Tags = lazy(() => import("@/pages/Tags"));
const ArticleFilterList = lazy(() => import("@/pages/ArticleFilterList"));
const Say = lazy(() => import("@/pages/Say"));
const TimeLine = lazy(() => import("@/pages/TimeLine"));
const About = lazy(() => import("@/pages/About"));
const Post = lazy(() => import("@/pages/Post"));

const Main: React.FC = () => (
  <main className={s.main}>
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className={s.spinBox}>
            <Spin size="large" tip="Loading..." />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tags" element={<Tags />}></Route>
          <Route path="/classes" element={<Classes />}></Route>
          <Route path="/say" element={<Say />}></Route>
          <Route path="/timeline" element={<TimeLine />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route
            path="/articleFilterList"
            element={<ArticleFilterList />}
          ></Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  </main>
);

export default Main;
