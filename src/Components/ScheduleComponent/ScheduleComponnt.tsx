import axios from "axios";
import { useState } from "react";

type Appointment = {
  date: string;
  time: string;
  info: string;
};

type SetAppointmentsType = React.Dispatch<React.SetStateAction<Appointment[]>>;

export const ScheduleComponent = ({
  userId,
  setAppointments,
}: {
  userId: string | null;
  setAppointments: SetAppointmentsType;
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [moreInfo, setMoreInfo] = useState("");

  const handleSchedule = async () => {
    if (!date || !time || !moreInfo) return;

    try {
      await axios.post("http://localhost:3000/schedule", {
        userId: userId,
        date,
        time,
        moreInfo,
      });
      alert("Appointment scheduled successfully!");
      setAppointments((prev) => [...prev, { date, time, info: moreInfo }]);
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
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <textarea
        name="moreInfo"
        id="1"
        cols={30}
        placeholder="tell us how we can help you"
        rows={4}
        onChange={(e) => setMoreInfo(e.target.value)}
      ></textarea>
      <button onClick={handleSchedule}>Schedule Viewing</button>
    </div>
  );
};
