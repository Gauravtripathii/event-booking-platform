import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import type { EventData } from "../types/eventTypes";
import { Calendar } from "lucide-react";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [eventData, setEventData] = useState<EventData | null>(null);

  useEffect(() => {
    const storedEvents: EventData[] = JSON.parse(localStorage.getItem("events") || "[]");
    const foundEvent = storedEvents.find((ev) => ev.id === id);
    if (foundEvent) {
      setEventData(foundEvent);
    } else {
      toast.error("Event not found!");
      navigate("/");
    }
  }, [id, navigate]);

  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!eventData) throw new Error("No event data!");

      if (!eventData.title) throw new Error("Title can't be blank!");
      if (!eventData.description) throw new Error("Description can't be blank!");
      if (!eventData.date) throw new Error("Date can't be blank!");
      if (!eventData.location) throw new Error("Location can't be blank!");
      if (!eventData.capacity || eventData.capacity <= 0)
        throw new Error("Capacity must be greater than 0!");

      const storedEvents: EventData[] = JSON.parse(localStorage.getItem("events") || "[]");
      const updatedEvents = storedEvents.map((ev) =>
        ev.id === id ? eventData : ev
      );

      localStorage.setItem("events", JSON.stringify(updatedEvents));
      toast.success("Event updated successfully!");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (!eventData) return null;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-3">
      {/* ICON */}
      <div className="bg-blue-600 w-fit p-3 rounded-xl ">
        <Calendar color="white" />
      </div>

      <h1 className="text-2xl font-bold">Edit Event</h1>

      <form
        onSubmit={handleUpdateEvent}
        className="shadow-lg p-5 rounded-lg flex flex-col gap-3 w-[400px]"
      >
        <p className="flex flex-col">
          <label className="text-gray-700">Title</label>
          <input
            type="text"
            className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
          />
        </p>

        <p className="flex flex-col">
          <label className="text-gray-700">Description</label>
          <textarea
            className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none"
            value={eventData.description}
            onChange={(e) =>
              setEventData({ ...eventData, description: e.target.value })
            }
          />
        </p>

        <p className="flex flex-col">
          <label className="text-gray-700">Date</label>
          <input
            type="date"
            className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none"
            value={eventData.date}
            onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
          />
        </p>

        <p className="flex flex-col">
          <label className="text-gray-700">Location</label>
          <input
            type="text"
            className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none"
            value={eventData.location}
            onChange={(e) =>
              setEventData({ ...eventData, location: e.target.value })
            }
          />
        </p>

        <p className="flex flex-col">
          <label className="text-gray-700">Capacity</label>
          <input
            type="number"
            className="px-3 py-2 rounded-lg border border-gray-400 text-gray-600 outline-none"
            value={eventData.capacity}
            onChange={(e) =>
              setEventData({ ...eventData, capacity: parseInt(e.target.value) })
            }
          />
        </p>

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg cursor-pointer hover:bg-purple-900 transition-all"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}
