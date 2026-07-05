import toast from "react-hot-toast";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Calendar } from "lucide-react";

import type { UserData } from "../types/userTypes";


export default function Signup() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState<UserData | null>(null);
    const [confirmPasswordData, setConfirmPasswordData] = useState<string | null>(null);

    const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {

            if (!userData)
                throw new Error("Can't submit nothing!");
            if (userData?.password !== confirmPasswordData)
                throw new Error("Password dosen't match!");
            if (!userData?.username)
                throw new Error("Username can't be blank!");
            if (!userData?.email)
                throw new Error("Email can't be blank!");
            if (!userData?.password)
                throw new Error("Password can't be blank!");

            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
            existingUsers.push(userData);
            localStorage.setItem("users", JSON.stringify(existingUsers));

            console.log("User saved locally:", userData);
            toast.success("User sign up success!");
            navigate("/login");
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
            
            <h1 className="text-2xl font-bold">Create an account</h1>

            <form onSubmit={handleSignup} className="shadow-lg p-5 rounded-lg flex flex-col gap-3">

                <p className="flex flex-col">
                    <label className="text-gray-700">Username</label>
                    <input type="text" placeholder="Choose a username" className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none" value={userData?.username} onChange={e => setUserData({ ...userData, username: e.target.value, role: 'USER'})} />
                </p>

                <p className="flex flex-col">
                    <label className="text-gray-700">Email</label>
                    <input type="email" placeholder="Enter your email" className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none" value={userData?.email} onChange={e => setUserData({ ...userData, email: e.target.value})} />
                </p>

                <p className="flex flex-col">
                    <label className="text-gray-700">Password</label>
                    <input type="password" placeholder="Create a password" className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none"  value={userData?.password} onChange={e => setUserData({ ...userData, password: e.target.value})} />
                </p>

                <p className="flex flex-col">
                    <label className="text-gray-700">Confirm Password</label>
                    <input type="password" placeholder="Confirm your password" className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none" value={confirmPasswordData} onChange={e => setConfirmPasswordData(e.target.value)} />
                </p>

                <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg cursor-pointer hover:bg-purple-900 transition-all">Create your account</button>

                <p className="text-gray-600">Already have an account? <NavLink to={"/login"} className="text-blue-600 underline">Login</NavLink></p>

            </form>

            
        </div>
    );
}

