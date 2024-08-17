export const Appointments = ({
  appointments,
}: {
  userId: string | null;
  appointments: { date: string; time: string; info: string }[];
}) => {
  return (
    <div>
      <div className="appointments">
        {appointments.map((appointment, index) => (
          <div key={index} className="appointment">
            <div>{appointment.date}</div>
            <div>{appointment.time}</div>
            <div>{appointment.info}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
