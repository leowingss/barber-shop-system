import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale/pt-BR";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Leonardo!</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE', 'dd 'de' MMMM'", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>
      <div className="px-5 mt-6">
        <h2 className="text-sm uppercase mb-3 text-gray-400 font-bold">
          Agendamentos
        </h2>
        <BookingItem />
      </div>
    </div>
  );
}
