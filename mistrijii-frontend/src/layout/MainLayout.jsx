import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header />

            {/* Page Content */}
            <main className="pt-[72px]">
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;