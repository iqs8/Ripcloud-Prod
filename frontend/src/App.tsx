// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import { ChatPage } from "./pages/chat/ChatPage";
import { AlbumPage } from "./pages/album/AlbumPage";
import { AdminPage } from "./pages/Admin/AdminPage";
import {Toaster} from "react-hot-toast"
import { UploadPage } from "./pages/Upload/UploadPage";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {


  return (
    <>
      <Routes>
        <Route 
          path="/sso-calback" 
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>} />

        <Route path="auth-callback" element={<AuthCallbackPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="upload" element={<UploadPage />} />


        <Route element ={<MainLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage/>} />
            <Route path="/albums/:albumId" element={<AlbumPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </>
  );
}

export default App
