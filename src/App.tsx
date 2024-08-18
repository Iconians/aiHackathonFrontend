import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { ChatComponent } from "./Components/ChatComponent/ChatComponent";
import { ScheduleComponent } from "./Components/ScheduleComponent/ScheduleComponnt";
import { Appointments } from "./Components/Appointments/Appointments";

function App() {
  const [userId, setUserId] = useState<null | string>(null);
  const [view, setView] = useState(0);
  const [appointments, setAppointments] = useState<
    { date: string; time: string; info: string }[]
  >([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log(apiUrl);
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        const response = await axios.get(`${apiUrl}/session`);
        localStorage.setItem("userId", response.data.userId);
        setUserId(response.data.userId);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/appointments`, {
          params: {
            userId: userId,
          },
        });
        console.log(response);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [userId, appointments.length]);

  return (
    <>
      <h1>Realtor assistant</h1>
      <div>
        {view === 0 ? (
          <div>
            {/* make more clear */}
            <h2>How can I help you today</h2>
            <button onClick={() => setView(1)}>have a questions</button>
            <button onClick={() => setView(2)}>Schedule an appointment</button>
          </div>
        ) : view === 1 ? (
          <div>
            <h2>Hi I am a AI assistant, how can I help you today</h2>
            <ChatComponent userId={userId} />
            <button onClick={() => setView(2)}>Schedule an appointment</button>
          </div>
        ) : (
          <div>
            <h2>
              please schedule an appointment, we look forward to helping you
            </h2>
            <ScheduleComponent
              userId={userId}
              setAppointments={setAppointments}
            />
            <Appointments userId={userId} appointments={appointments} />
            <button onClick={() => setView(1)}>have a questions</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
