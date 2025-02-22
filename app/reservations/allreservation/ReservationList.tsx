import React from "react";

type ReservationProps = {
  reservations: {
    id: string;
    startDate: string;
    endDate: string;
    User: {
      firstName: string | null;
      lastName: string | null;
      email: string | null;
    } | null;
    Home: {
      title: string | null;
      price: number | null | undefined;
      country: string | null;
    } | null;
  }[];
};

const calculateTotalDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 3600 * 24)); // Convert milliseconds to days
};

const calculateTotalPrice = (price: number | null | undefined, totalDays: number): number => {
  if (price === null || price === undefined) {
    return 0;
  }
  return price * totalDays;
};

export const ReservationList: React.FC<ReservationProps> = ({ reservations }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Reservation ID</th>
            <th className="px-4 py-2 border border-gray-300">Start Date</th>
            <th className="px-4 py-2 border border-gray-300">End Date</th>
            <th className="px-4 py-2 border border-gray-300">Total Days</th>            
            <th className="px-4 py-2 border border-gray-300">Home Price</th>
            <th className="px-4 py-2 border border-gray-300">Total Price</th>
            <th className="px-4 py-2 border border-gray-300">Reserver Name</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">Home Title</th>
            <th className="px-4 py-2 border border-gray-300">Home Country</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            const totalDays = calculateTotalDays(reservation.startDate, reservation.endDate);
            const totalPrice = calculateTotalPrice(reservation.Home?.price, totalDays);

            return (
              <tr key={reservation.id}>
                <td className="px-4 py-2 border border-gray-300">{reservation.id}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(reservation.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(reservation.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">{totalDays}</td>
                <td className="px-4 py-2 border border-gray-300">{reservation.Home?.price}</td>
                <td className="px-4 py-2 border border-gray-300">{totalPrice}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {reservation.User?.firstName} {reservation.User?.lastName}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {reservation.User?.email}
                </td>
                <td className="px-4 py-2 border border-gray-300">{reservation.Home?.title}</td>
                <td className="px-4 py-2 border border-gray-300">{reservation.Home?.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
