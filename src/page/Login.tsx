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

    const [userData, setUserData] = useState<UserData>({
        username: "",
        email: "",
        password: "",
        role: "USER",
    });


    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!userData.email) throw new Error("Email can't be blank!");
            if (!userData.password) throw new Error("Password can't be blank!");

            const existingUsers: UserData[] = JSON.parse(localStorage.getItem("users") || "[]");
            const searchUser = existingUsers.find((user) => user.email === userData.email);

            if (!searchUser) throw new Error("User not found!");
            if (searchUser.password !== userData.password) throw new Error("Incorrect Password!");

            localStorage.setItem("auth_user", JSON.stringify({ ...searchUser, password: "" }));

            toast.success("User login successful!");
            updateAuthUserCallback(searchUser.username, searchUser.email, searchUser.role);
            navigate("/");
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

            <h1 className="text-2xl font-bold">Login to your account</h1>

            <form onSubmit={handleLogin} className="shadow-lg p-5 rounded-lg flex flex-col gap-3">

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
                        placeholder="Enter your password"
                        value={userData.password}
                        onChange={(e) =>
                            setUserData({ ...userData, password: e.target.value })
                        }
                    />
                </p>

                <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg cursor-pointer hover:bg-purple-900 transition-all">Login to your account</button>

                <p className="text-gray-600">Don't have an account? <NavLink to={"/signup"} className="text-blue-600 underline">Sign Up</NavLink></p>

            </form>


        </div>
    );
}

