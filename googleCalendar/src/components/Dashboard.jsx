import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashBoard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      setError("Access token is missing. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const eventsData = response.data.items || [];
        // Filter and sort events by start time
        setEvents(eventsData);
        const upcomingEvents = eventsData
          .filter((event) => {
            const eventDate = new Date(
              event.start?.dateTime || event.start?.date
            );
            return eventDate >= new Date();
          })
          .sort((a, b) => {
            const dateA = new Date(a.start?.dateTime || a.start?.date);
            const dateB = new Date(b.start?.dateTime || b.start?.date);
            return dateA - dateB;
          });

        setFilteredEvents(upcomingEvents);
      } catch (err) {
        setError(
          err.response?.data?.error?.message || "Failed to fetch events"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [accessToken]);

  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    if (selectedDate) {
      const filtered = events.filter((event) => {
        const eventDate = new Date(event.start?.dateTime || event.start?.date);
        return (
          eventDate >= new Date(selectedDate) &&
          eventDate.toISOString().startsWith(selectedDate)
        );
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  if (loading) {
    return <p className="text-center mt-4 text-lg">Loading events...</p>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-center mt-4 text-red-500">Error: {error}</p>
        <button
          onClick={handleLogout}
          className="px-6 py-3 mt-10 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Your Google Calendar Events
      </h1>

      {/* Date Filter */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="filterDate" className="text-lg font-medium">
            Filter by Date:
          </label>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Events Table */}
      {filteredEvents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Event Name</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => {
                const startDateTime = new Date(
                  event.start?.dateTime || event.start?.date
                );
                const date = startDateTime.toLocaleDateString();
                const time = event.start?.dateTime
                  ? startDateTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "All Day";
                return (
                  <tr
                    key={event.id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                  >
                    <td className="py-2 px-4">{event.summary || "No Title"}</td>
                    <td className="py-2 px-4">{date}</td>
                    <td className="py-2 px-4">{time}</td>
                    <td className="py-2 px-4">{event.location || "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">
          No upcoming events found.
        </p>
      )}
      <button
        onClick={handleLogout}
        className="px-6 py-3 mt-10 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition"
      >
        Log Out
      </button>
    </div>
  );
};

export default DashBoard;
