import axios from "axios";
import { useState } from "react";

export const Appointments = ({ userId }: { userId: string | null }) => {
  const [appointments, setAppointments] = useState<
    { date: string; time: string }[]
  >([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/appointments", {
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

  return (
    <div>
      <div className="appointments">
        {appointments.map((appointment, index) => (
          <div key={index} className="appointment">
            <div>{appointment.date}</div>
            <div>{appointment.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
