import Header from "../shared/components/header";
import Footer from "../shared/components/footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-base)", color: "var(--text-1)" }}>
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;