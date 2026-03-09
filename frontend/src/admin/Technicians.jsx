const technicians = [
    {
        id: 1,
        name: "Amit Kumar",
        skill: "AC Expert",
        phone: "+91 98765 43210",
        status: "Verified",
        rating: "4.9"
    },
    {
        id: 2,
        name: "Rajesh Singh",
        skill: "Plumber",
        phone: "+91 98765 41230",
        status: "Pending",
        rating: "0.0"
    }
]

const Technicians = () => {
    return (
        <div className="anim-fade-up">
            <div className="mb-8 flex justify-between items-end flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Technicians</h1>
                    <p className="text-gray-500 mt-1">Manage and verify registered professionals</p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm active:scale-95 text-sm">
                    + Add Technician
                </button>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                            <tr>
                                <th className="py-4 px-6 border-r border-gray-100">Name</th>
                                <th className="py-4 px-6 border-r border-gray-100">Skill</th>
                                <th className="py-4 px-6 border-r border-gray-100">Contact</th>
                                <th className="py-4 px-6 border-r border-gray-100">Rating</th>
                                <th className="py-4 px-6 border-r border-gray-100">Status</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {technicians.map((tech) => (
                                <tr key={tech.id} className="hover:bg-orange-50/30 transition-colors">
                                    <td className="py-4 px-6 font-semibold text-gray-900">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">{tech.name.charAt(0)}</div>
                                            {tech.name}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600"><span className="bg-gray-100 border border-gray-200 px-2.5 py-1 rounded text-xs font-medium">{tech.skill}</span></td>
                                    <td className="py-4 px-6 font-medium text-gray-600">{tech.phone}</td>
                                    <td className="py-4 px-6 font-bold text-gray-700">⭐ {tech.rating}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 font-bold text-[11px] uppercase tracking-wider rounded-full border ${tech.status === "Verified"
                                                ? "bg-green-50 text-green-600 border-green-200"
                                                : "bg-yellow-50 text-yellow-600 border-yellow-200"
                                            }`}>
                                            {tech.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right space-x-4">
                                        <button className="text-blue-500 hover:text-blue-700 font-semibold text-xs uppercase tracking-wide transition-colors">Edit</button>
                                        <button className="text-red-500 hover:text-red-700 font-semibold text-xs uppercase tracking-wide transition-colors">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Technicians