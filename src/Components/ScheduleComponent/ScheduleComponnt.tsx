import axios from "axios";
import { useState } from "react";

export const ScheduleComponent = ({ userId }: { userId: string | null }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSchedule = async () => {
    if (!date || !time) return;

    try {
      await axios.post("http://localhost:3000/schedule", {
        userId: userId,
        date,
        time,
      });
      alert("Appointment scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      alert("Failed to schedule appointment");
    }
  };

  return (
    <div>
      <input
        type="date"
        value={date}
        placeholder="pick a date"
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        placeholder="pick a time"
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={handleSchedule}>Schedule Viewing</button>
    </div>
  );
};
