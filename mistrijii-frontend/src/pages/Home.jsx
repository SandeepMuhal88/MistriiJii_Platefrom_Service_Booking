import { Link } from "react-router-dom";
import SEOHead from "../context/SEOHead.jsx";

const Home = () => {
    return (
        <main className="min-h-screen">

            <SEOHead
                title="MistriJii - Demand your service now"
                description="Book home services like electrician, AC repair, mechanic, and more at your doorstep."
            />

            {/* ───────── HERO ───────── */}
            <section className="relative text-white text-center py-24 px-6 bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 overflow-hidden">

                {/* blobs */}
                <div className="absolute w-[600px] h-[600px] bg-orange-500/20 blur-[120px] rounded-full top-[-200px] right-[-100px]" />
                <div className="absolute w-[400px] h-[400px] bg-cyan-400/20 blur-[100px] rounded-full bottom-[-120px] left-[-60px]" />

                <div className="relative max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        MistriJii — Demand your service now
                    </h1>

                    <p className="text-lg md:text-xl mb-8 text-white/90">
                        Get professional home services delivered to your door.
                    </p>

                    <Link
                        to="/booking"
                        className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 transition rounded-lg font-semibold shadow-lg"
                    >
                        Book Service
                    </Link>
                </div>

            </section>

            {/* ───────── SERVICES ───────── */}
            <section className="py-20 bg-gray-50 text-center">
                <div className="max-w-6xl mx-auto px-6">

                    <h2 className="text-3xl font-bold mb-12">
                        Our Services
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {[
                            { title: "Electrician", desc: "Expert electrical services" },
                            { title: "AC Service", desc: "Air conditioning repair & maintenance" },
                            { title: "Mechanic", desc: "General mechanical repairs" },
                            { title: "Plumber", desc: "Professional plumbing solutions" }
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                            >
                                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                                <p className="text-gray-500 text-sm">{s.desc}</p>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* ───────── HOW IT WORKS ───────── */}
            <section className="py-20 text-center">
                <div className="max-w-5xl mx-auto px-6">

                    <h2 className="text-3xl font-bold mb-12">
                        How It Works
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6">

                        {[
                            { title: "Book Service", desc: "Fill out the booking form with your details." },
                            { title: "Choose Date", desc: "Select your preferred date and time." },
                            { title: "Service Delivered", desc: "Our professional arrives at your location." }
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-xl shadow max-w-[260px] hover:shadow-lg transition"
                            >
                                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                                    {i + 1}
                                </div>

                                <h3 className="font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm">{step.desc}</p>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

        </main>
    );
};
export default Home;