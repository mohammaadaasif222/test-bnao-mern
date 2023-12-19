import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LazyHeader = lazy(() => import("./components/Header"));
const LazyCreatePost = lazy(() => import("./Pages/CreatePost"));
const LazySignUp = lazy(() => import("./Pages/SignUp"));
const LazySignIn = lazy(() => import("./Pages/SignIn"));
const LazyHome = lazy(() => import("./Pages/Home"));
const LazyPost = lazy(() => import("./Pages/Post"));
const LazyPrivateRoute = lazy(() => import("./components/PrivateRoute"));
const LazyForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const LazyResetPassword = lazy(() => import("./Pages/ResetPassword"));
const LazyProfile = lazy(() => import("./Pages/Profile"));
import Loader from './components/Loader'


export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <LazyHeader />
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/sign-in" element={<LazySignIn />} />
          <Route path="/sign-up" element={<LazySignUp />} />
          <Route path='/post/:postId' element={<LazyPost />} />
          <Route path='/forgot' element={<LazyForgotPassword />} />
          <Route path='/reset-password/:token' element={<LazyResetPassword />} />
          <Route element={<LazyPrivateRoute />}>
            <Route path="/profile" element={<LazyProfile />} />
            <Route path="/create-post" element={<LazyCreatePost />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
