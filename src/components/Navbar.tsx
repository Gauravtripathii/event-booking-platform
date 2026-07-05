import { NavLink } from "react-router-dom";

import { Home, Calendar, CalendarCog } from "lucide-react";

export default function Navbar({ authUser, updateAuthUserCallback }) {

    const handleLogout = () => {
        localStorage.removeItem('auth_user');
        updateAuthUserCallback("", "", "");
    }
    return (
        <nav className="w-full flex items-center justify-between px-10 py-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">

            <div className="flex items-center justify-center gap-1 cursor-pointer">
                <Calendar color="blue" />
                <span className="font-bold text-lg">EventHub</span>
            </div>

            <div className="flex gap-5">
                <NavLink to={"/"} className="flex items-center justify-center cursor-pointer gap-1">
                    <Home color="gray" />
                    <span className="text-lg text-gray-600">Home</span>
                </NavLink>

                {
                    authUser?.role === "ADMIN" &&
                    <NavLink to={"/add-event"} className="flex items-center justify-center cursor-pointer gap-1">
                        <CalendarCog color="gray" />
                        <span className="text-lg text-gray-600">Add Event</span>
                    </NavLink>
                }
            </div>

            {
                !authUser ?
                    <div className="flex items-center justify-center gap-4">
                        <NavLink to={"/login"} className="text-gray-600 font-bold text-md cursor-pointer hover:scale-105 transition-all">Login</NavLink>
                        <NavLink to={"/signup"} className="bg-blue-500 text-white font-bold text-md px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transition-all">Sign Up</NavLink>
                    </div> :
                    <span onClick={handleLogout} className="bg-red-500 text-white font-bold text-md px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transition-all">Logout</span>
            }

        </nav>
    );
}
