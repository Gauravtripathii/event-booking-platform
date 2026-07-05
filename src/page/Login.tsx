import toast from "react-hot-toast";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import type { UserData } from "../types/userTypes";

import { Calendar } from "lucide-react";

interface LoginProps {
  updateAuthUserCallback: (username: string, email: string, role: string) => void;
}

export default function Login({ updateAuthUserCallback }: LoginProps) {
    const navigate = useNavigate();

    const [userData, setUserData] = useState<UserData | null>(null);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {

            if (!userData)
                throw new Error("Can't submit nothing!");
            if (!userData?.email)
                throw new Error("Email can't be blank!");
            if (!userData?.password)
                throw new Error("Password can't be blank!");

            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
            
            const searchUser = existingUsers.filter((user: any) => user.email === userData?.email)[0];

            if (!searchUser)
                throw new Error("User not found!");
            if (searchUser.password !== userData.password)
                throw new Error("Incorrect Password!");
            

            localStorage.setItem("auth_user", JSON.stringify({...searchUser, password:""}));

            console.log("User login successfull!");
            toast.success("User login successfull!");

            updateAuthUserCallback(searchUser.username, searchUser.email, searchUser.role);
            
            navigate("/");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }


    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-3">

            {/* ICON */}
            <div className="bg-blue-600 w-fit p-3 rounded-xl ">
                <Calendar color="white" />
            </div>
            
            <h1 className="text-2xl font-bold">Login to your account</h1>

            <form onSubmit={handleLogin} className="shadow-lg p-5 rounded-lg flex flex-col gap-3">

                <p className="flex flex-col">
                    <label className="text-gray-700">Email</label>
                    <input type="email" placeholder="Enter your email" className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none" value={userData?.email} onChange={e => setUserData({ ...userData, email: e.target.value, role: 'USER'})} />
                </p>

                <p className="flex flex-col">
                    <label className="text-gray-700">Password</label>
                    <input type="password" placeholder="Enter your password" className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none" value={userData?.password} onChange={e => setUserData({ ...userData, password: e.target.value})} />
                </p>

                <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg cursor-pointer hover:bg-purple-900 transition-all">Login to your account</button>

                <p className="text-gray-600">Don't have an account? <NavLink to={"/signup"} className="text-blue-600 underline">Sign Up</NavLink></p>

            </form>

            
        </div>
    );
}

