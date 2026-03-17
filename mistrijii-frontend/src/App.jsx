import { BookingProvider } from "./features/booking/context/BookingContext";
import AppRoutes from "./app/routes";
import "./App.css";

function App() {
  return (
    <BookingProvider>
      <AppRoutes />
    </BookingProvider>
  );
}

export default App;