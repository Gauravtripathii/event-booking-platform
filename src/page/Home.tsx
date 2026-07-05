import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import type { EventData } from "../types/eventTypes";
import type { UserResponse } from "../types/userTypes";


interface HomeProps {
  authUser: UserResponse | null;
  updateAuthUserCallback: (username: string, email: string, role: string) => void;
}

export default function Home({ authUser, updateAuthUserCallback }: HomeProps) {
    const [events, setEvents] = useState<EventData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
        setEvents(storedEvents);
    }, []);

    const handleDelete = (id: string) => {
        const updatedEvents = events.filter((event) => event.id !== id);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
    };

    const handleBook = (id: string) => {
        if (!authUser) return;
        const updatedEvents = events.map((event) =>
            event.id === id
                ? { ...event, attendees: [...event.attendees, authUser.email] }
                : event
        );
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
        toast.success("Event booked successfully!");
    };

    return (
        <div className="flex flex-col items-center gap-10">
            <Navbar authUser={authUser} updateAuthUserCallback={updateAuthUserCallback} />

            {/* WELCOME */}
            <div className="w-3/4 p-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col gap-5">
                <div className="text-gray-200 flex gap-2">
                    <Sparkles color="yellow" />
                    Discover Amazing Events
                </div>

                <h1 className="text-white font-bold text-5xl">Welcome to EventHub</h1>
                <p className="text-white text-xl">
                    Find and book the best events happening near you
                </p>
            </div>

            {/* EVENTS LIST */}
            <div className="w-3/4 flex flex-col gap-5">
                {events.length === 0 ? (
                    <p className="text-gray-600">No events available.</p>
                ) : (
                    events.map((event) => {
                        const alreadyBooked =
                            authUser && event.attendees.includes(authUser.email);

                        return (
                            <div
                                key={event.id}
                                className="border p-5 rounded-lg shadow-md flex justify-between items-center"
                            >
                                <div>
                                    <h2 className="text-xl font-bold">{event.title}</h2>
                                    <p>{event.description}</p>
                                    <p className="text-gray-600">
                                        {event.date} | {event.location}
                                    </p>
                                    <p className="text-gray-500">Capacity: {event.capacity}</p>
                                </div>

                                {/* ROLE-BASED BUTTONS */}
                                <div className="flex gap-3">
                                    {authUser?.role === "ADMIN" ? (
                                        <>
                                            <button
                                                onClick={() => navigate(`/edit-event/${event.id}`)}
                                                className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event.id)}
                                                className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-800"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                if (!authUser) {
                                                    navigate("/login");
                                                } else if (!alreadyBooked) {
                                                    handleBook(event.id);
                                                }
                                            }}
                                            disabled={alreadyBooked}
                                            className={`px-3 py-2 rounded-lg text-white ${alreadyBooked
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-blue-600 hover:bg-purple-900"
                                                }`}
                                        >
                                            {alreadyBooked ? "Already Booked" : "Book"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

        </div>
    );
}
