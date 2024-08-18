export const Appointments = ({
  appointments,
}: {
  appointments: {
    date: string;
    time: string;
    info: string;
    fullName: string;
    phone: string;
    email: string;
  }[];
}) => {
  return (
    <div>
      <div className="appointments">
        <h3>requested appointments</h3>
        {appointments.map((appointment, index) => (
          <div key={index} className="appointment">
            <div>Name: {appointment.fullName}</div>
            <div>Phone: {appointment.phone}</div>
            <div>Email: {appointment.email}</div>
            <div>Date:{appointment.date}</div>
            <div>Time: {appointment.time}</div>
            <div>Details: {appointment.info}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
