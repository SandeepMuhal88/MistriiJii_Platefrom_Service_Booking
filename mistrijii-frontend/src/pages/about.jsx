import { Link } from 'react-router-dom';

const aboutSchema = [
    {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://mistrijii.in/#organization',
        name: 'MistriJii',
        url: 'https://mistrijii.in',
        logo: 'https://mistrijii.in/logo.png',
        foundingDate: '2026',
        description:
            'MistriJii is India\'s on-demand home services platform connecting users with police-verified technicians for AC repair, Electrician, Mechanic, Plumber, Car & Bike service.',
        founders: [{ '@type': 'Person', name: 'Sandeep Muhal and Umesh Muhal ' }],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-9511582964',
            contactType: 'customer service',
            availableLanguage: ['Hindi', 'English'],
            contactOption: 'TollFree',
            areaServed: 'IN',
        },
    },
];


const whatWeDo = [
    { icon: '⚡', title: 'Electrical Solutions', desc: 'From short circuits to full rewiring — our certified electricians handle it all. Safe, fast, reliable.', color: '#F59E0B' },
    { icon: '❄️', title: 'AC & Cooling Services', desc: 'AC service, deep clean, gas refill, PCB repair, compressor replacement — one call for all cooling needs.', color: '#06B6D4' },
    { icon: '🔧', title: 'Mechanic & Repair', desc: 'Motor, pump, machine, pipe — expert mechanics come to your doorstep for any mechanical repair.', color: '#A78BFA' },
    { icon: '🚗', title: 'Vehicle Services', desc: 'Car & bike doorstep service — oil change, brake check, tyre rotation — skip the garage entirely.', color: '#10B981' },
    { icon: '🏠', title: 'Home Maintenance', desc: 'Plumbing, painting, carpentry, cleaning — any home task, just call us.', color: '#FB923C' },
    { icon: '📺', title: 'Appliance Repair', desc: 'TV, washing machine, fridge, microwave — all appliance repairs at home with genuine parts.', color: '#818CF8' },
];

const values = [
    { icon: '🛡️', title: 'Fully Verified', desc: 'Every technician undergoes police verification and skill assessment before joining our platform.' },
    { icon: '⚡', title: 'Lightning Fast', desc: 'Expert at your doorstep within 60 minutes of booking — guaranteed response time.' },
    { icon: '💰', title: 'Fair Pricing', desc: 'Transparent billing — no hidden charges. You see the price, that\'s what you pay.' },
    { icon: '⭐', title: 'Quality Warranty', desc: '30-day service warranty on every job. Not satisfied? We\'ll fix it for free.' },
];

const team = [
    { name: 'Sandeep Singh', role: 'Founder & CEO', emoji: '👨‍💼', color: '#F97316' },
    { name: 'Priya Sharma', role: 'Operations Head', emoji: '👩‍💼', color: '#06B6D4' },
    { name: 'Rahul Gupta', role: 'Tech Lead', emoji: '👨‍💻', color: '#A78BFA' },
    { name: 'Anita Verma', role: 'Customer Success', emoji: '👩‍🎧', color: '#10B981' },
];

const storyStats = [
    { val: '2026', label: 'Founded' },
    { val: '10K+', label: 'Happy Customers' },
    { val: '500+', label: 'Expert Technicians' },
    { val: '20+', label: 'Cities in India' },
];

const About = () => (
    <main className="flex-1 pt-[70px]">

        {/* ───────── STORY SECTION ───────── */}
        <section className="section bg-[var(--bg-base)]">
            <div className="container grid lg:grid-cols-2 gap-16 items-center">

                <div className="flex flex-col gap-5">
                    <span className="badge badge-white">📖 Our Story</span>

                    <h2 className="text-[clamp(1.8rem,3vw,2.6rem)]">
                        Why <span className="gradient-text">MistriJii</span> Was Born
                    </h2>

                    <p className="text-[0.95rem] leading-[1.75] text-[var(--text-secondary)]">
                        In 2023, our founder <strong className="text-[var(--text-primary)] font-semibold">Sandeep Singh</strong> spent 3 frustrating days trying to find a reliable AC technician during peak summer.
                    </p>

                    <p className="text-[0.95rem] leading-[1.75] text-[var(--text-secondary)]">
                        That’s when MistriJii was born — a platform where <strong className="text-[var(--text-primary)] font-semibold">one call brings a verified expert</strong> to your door.
                    </p>

                    <p className="text-[0.95rem] leading-[1.75] text-[var(--text-secondary)]">
                        Today, MistriJii has become the first choice for 10,000+ families across India.
                    </p>

                    <Link to="/booking" className="btn btn-primary w-fit mt-2">
                        📅 Book Your First Service
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {storyStats.map((s, i) => (
                        <div
                            key={i}
                            className="bg-[var(--bg-elevated)] border border-white/10 rounded-2xl p-7 text-center transition hover:-translate-y-1 hover:border-orange-400/30"
                        >
                            <div className="font-display text-[2.2rem] font-black tracking-tight gradient-text leading-none mb-2">
                                {s.val}
                            </div>

                            <div className="text-[0.8rem] font-semibold text-[var(--text-muted)] tracking-wide">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>

        {/* ───────── WHAT WE DO ───────── */}
        <section className="section bg-[var(--bg-base)]">
            <div className="container">

                <div className="section-header">
                    <span className="badge">🛠️ What We Do</span>
                    <h2>Services We <span className="gradient-text">Provide</span></h2>
                    <p>MistriJii gives you India's best home service experience.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    {whatWeDo.map((item, i) => (
                        <div
                            key={i}
                            className="bg-[var(--bg-elevated)] border border-white/10 rounded-2xl p-7 flex flex-col gap-3 transition hover:-translate-y-1 hover:shadow-md"
                            style={{ borderColor: `${item.color}30` }}
                        >

                            <div
                                className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-xl"
                                style={{
                                    background: `${item.color}12`,
                                    border: `1px solid ${item.color}22`
                                }}
                            >
                                {item.icon}
                            </div>

                            <h3 className="text-[0.95rem] font-bold">{item.title}</h3>

                            <p className="text-[0.82rem] text-[var(--text-muted)] leading-[1.65]">
                                {item.desc}
                            </p>

                            <div className="h-[2px] opacity-40 mt-auto" style={{ background: item.color }} />
                        </div>
                    ))}

                </div>

            </div>
        </section>

        {/* ───────── VALUES ───────── */}
        <section className="section bg-[var(--bg-surface)]">
            <div className="container">

                <div className="section-header">
                    <span className="badge badge-cyan">💎 Our Values</span>
                    <h2>What Makes Us <span className="gradient-text">Different</span></h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {values.map((v, i) => (
                        <div
                            key={i}
                            className="bg-[var(--bg-elevated)] border border-white/10 rounded-2xl p-7 text-center transition hover:-translate-y-1 hover:shadow-xl"
                        >

                            <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center text-xl bg-orange-500/10 border border-orange-500/20">
                                {v.icon}
                            </div>

                            <h3 className="text-[0.95rem] font-bold mb-2">{v.title}</h3>

                            <p className="text-[0.8rem] text-[var(--text-muted)] leading-[1.6]">
                                {v.desc}
                            </p>

                        </div>
                    ))}

                </div>

            </div>
        </section>

        {/* ───────── MISSION ───────── */}
        <section className="section bg-[var(--bg-surface)]">
            <div className="container grid lg:grid-cols-2 gap-6">

                <div className="bg-[var(--bg-elevated)] border border-orange-400/30 rounded-2xl p-10 text-center transition hover:-translate-y-1 hover:shadow-md">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-xl mb-3">Our Mission</h3>
                    <p className="text-[0.9rem] leading-[1.7]">
                        To bring affordable, reliable and fast home services to every household in India.
                    </p>
                </div>

                <div className="bg-[var(--bg-elevated)] border border-cyan-400/30 rounded-2xl p-10 text-center transition hover:-translate-y-1 hover:shadow-md">
                    <div className="text-4xl mb-4">🔭</div>
                    <h3 className="text-xl mb-3">Our Vision</h3>
                    <p className="text-[0.9rem] leading-[1.7]">
                        To become India’s #1 home services platform by 2026.
                    </p>
                </div>

            </div>
        </section>

        {/* ───────── TEAM ───────── */}
        <section className="section bg-[var(--bg-base)]">
            <div className="container">

                <div className="section-header">
                    <span className="badge badge-white">👥 Team</span>
                    <h2>The People Behind <span className="gradient-text">MistriJii</span></h2>
                    <p>Passionate professionals committed to making home services better.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {team.map((m, i) => (
                        <div
                            key={i}
                            className="bg-[var(--bg-elevated)] border border-white/10 rounded-2xl p-8 text-center transition hover:-translate-y-1 hover:shadow-md"
                        >

                            <div
                                className="w-[72px] h-[72px] mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl"
                                style={{
                                    background: `${m.color}12`,
                                    border: `2px solid ${m.color}25`
                                }}
                            >
                                {m.emoji}
                            </div>

                            <h3 className="text-[0.95rem] font-bold mb-1">{m.name}</h3>

                            <p className="text-[0.78rem] font-semibold" style={{ color: m.color }}>
                                {m.role}
                            </p>

                        </div>
                    ))}

                </div>

            </div>
        </section>

        {/* ───────── CTA ───────── */}
        <section className="section">
            <div className="container">

                <div className="bg-gradient-to-br from-orange-500/10 to-cyan-500/5 border border-orange-400/30 rounded-[32px] px-[clamp(28px,4vw,64px)] py-[clamp(40px,5vw,72px)] text-center">
                    <h2 className="mb-4">
                        Ready to Experience <span className="gradient-text">MistriJii</span>?
                    </h2>

                    <p className="max-w-[440px] mx-auto mb-7">
                        Book now and get an expert at your doorstep within 30 minutes.
                    </p>

                    <Link to="/booking" className="btn btn-primary btn-lg">
                        Book a Service →
                    </Link>
                </div>

            </div>
        </section>

    </main>
)

export default About;

