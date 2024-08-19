import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { ChatComponent } from "./Components/ChatComponent/ChatComponent";
import { ScheduleComponent } from "./Components/ScheduleComponent/ScheduleComponnt";
import { Appointments } from "./Components/Appointments/Appointments";

type appointment = {
  appointments: {
    date: string;
    time: string;
    info: string;
    fullName: string;
    phone: string;
    email: string;
  }[];
};

function App() {
  const [view, setView] = useState(0);
  const [appointments, setAppointments] = useState<appointment["appointments"]>(
    []
  );

  useEffect(() => {
    const fetchUserId = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        const response = await axios.get(`${apiUrl}/session`);
        localStorage.setItem("userId", response.data.userId);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/appointments`, {
          params: {
            userId: userId,
          },
        });
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [appointments.length]);

  return (
    <>
      <h1>Realtor assistant</h1>
      <div>
        {view === 0 ? (
          <div>
            <h2>How can I help you today</h2>
            <p>
              have questions choose have questions to chat with our AI assistant
              otherwise please request an appointment to chat with one of our
              Realtors
            </p>
            <div className="btn-div">
              <button onClick={() => setView(1)}>
                have questions, ask our AI assistant
              </button>
              <button onClick={() => setView(2)}>Request an appointment</button>
            </div>
          </div>
        ) : view === 1 ? (
          <div>
            <h2>Hi I am a AI assistant, how can I help you today</h2>
            <ChatComponent />
            <button onClick={() => setView(2)}>Request an appointment</button>
          </div>
        ) : (
          <div>
            <h2>
              please request an appointment, we look forward to helping you
            </h2>
            <ScheduleComponent setAppointments={setAppointments} />
            {appointments.length && (
              <Appointments appointments={appointments} />
            )}
            <button onClick={() => setView(1)}>
              have questions, ask our AI assistant
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
