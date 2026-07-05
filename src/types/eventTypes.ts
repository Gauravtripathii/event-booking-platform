export type EventData = {
  id: string;
  title: string;
  description: string;
  date: string;       // ISO format
  location: string;
  capacity: number;
  attendees: string[]; // user emails
};

export type BookingResponse = {
  eventId: string;
  userEmail: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
};
