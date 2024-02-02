import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { Booking } from "@prisma/client";
import { isFuture, isPast } from "date-fns";

const BookingPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  });

  const confirmedBookings = bookings.filter((booking: Booking) =>
    isFuture(booking.date)
  );
  const finishedBooking = bookings.filter((booking: Booking) =>
    isPast(booking.date)
  );

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <h2 className="text-gray-400 mt-6 mb-3 uppercase text-sm font-bold">
          Confirmados
        </h2>

        <div className="flex flex-col gap-3">
          {confirmedBookings.map((booking: Booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>

        <h2 className="text-gray-400 mt-6 mb-3 uppercase text-sm font-bold">
          Finalizados
        </h2>

        <div className="flex flex-col gap-3">
          {finishedBooking.map((booking: Booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingPage;
