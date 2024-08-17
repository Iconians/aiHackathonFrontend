import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { ChatComponent } from "./Components/ChatComponent/ChatComponent";
import { ScheduleComponent } from "./Components/ScheduleComponent/ScheduleComponnt";
import { Appointments } from "./Components/Appointments/Appointments";

function App() {
  const [userId, setUserId] = useState<null | string>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        const response = await axios.get("http://localhost:3000/session");
        localStorage.setItem("userId", response.data.userId);
        setUserId(response.data.userId);
      }
    };

    fetchUserId();
  }, []);

  return (
    <>
      <ChatComponent />
      <ScheduleComponent userId={userId} />
      <Appointments userId={userId} />
    </>
  );
}

export default App;
