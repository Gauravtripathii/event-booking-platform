import toast from "react-hot-toast";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Calendar } from "lucide-react";

import type { UserData } from "../types/userTypes";


export default function Signup() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState<UserData>({
        username: "",
        email: "",
        password: "",
        role: "USER",
    });

    const [confirmPasswordData, setConfirmPasswordData] = useState<string>("");

    const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (userData.password !== confirmPasswordData)
                throw new Error("Passwords don't match!");
            if (!userData.username) throw new Error("Username can't be blank!");
            if (!userData.email) throw new Error("Email can't be blank!");
            if (!userData.password) throw new Error("Password can't be blank!");

            const existingUsers: UserData[] = JSON.parse(localStorage.getItem("users") || "[]");
            existingUsers.push(userData);
            localStorage.setItem("users", JSON.stringify(existingUsers));

            toast.success("User sign up success!");
            navigate("/login");
        } catch (error: any) {
            toast.error(error.message);
        }
    };



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
                    <input
                        type="text"
                        placeholder="Choose a username"
                        value={userData.username}
                        onChange={(e) =>
                            setUserData({ ...userData, username: e.target.value })
                        }
                    />
                </p>

                <p className="flex flex-col">
                    <label className="text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={userData.email}
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                    />
                </p>

                <p className="flex flex-col">
                    <label className="text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        value={userData.password}
                        onChange={(e) =>
                            setUserData({ ...userData, password: e.target.value })
                        }
                    />
                </p>

                <p className="flex flex-col">
                    <label className="text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPasswordData}
                        onChange={(e) => setConfirmPasswordData(e.target.value)}
                    />
                </p>

                <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg cursor-pointer hover:bg-purple-900 transition-all">Create your account</button>

                <p className="text-gray-600">Already have an account? <NavLink to={"/login"} className="text-blue-600 underline">Login</NavLink></p>

            </form>


        </div>
    );
}

