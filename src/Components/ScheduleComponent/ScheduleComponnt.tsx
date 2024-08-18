import axios from "axios";
import { useState } from "react";
import "./ScheduleComponent.css";

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
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSchedule = async () => {
    if (!date || !time || !moreInfo || !fullName || !phone || !email) return;

    try {
      await axios.post(`${apiUrl}/schedule`, {
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
    // add more inputs and make it look and work better
    <div className="form-wrapper">
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
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
