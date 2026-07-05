import { Toaster } from "react-hot-toast";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import type { UserResponse } from "./types/userTypes";

// pages
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import AddEvent from "./page/AddEvent";
import EditEvent from "./page/EditEvent";

// components


export default function App() {

  const [authUser, setAuthUser] = useState<UserResponse | null>(null);

  const updateAuthUserCallback = (username: string, email: string, role: any) => {
    if (username === "")
      setAuthUser(null);
    else
      setAuthUser({
        username: username,
        email: email,
        role: role,
      });
  }

  useEffect(() => {
    if (!authUser) {
      const searchUser = JSON.parse(localStorage.getItem('auth_user'));
      updateAuthUserCallback(searchUser.username, searchUser.email, searchUser.role);

    }
  }, [])


  return (
    <BrowserRouter>
      <div className="w-screen">

        <Toaster />

        <Routes>

          <Route path="/" element={<Home authUser={authUser} updateAuthUserCallback={updateAuthUserCallback} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login updateAuthUserCallback={updateAuthUserCallback} />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}
