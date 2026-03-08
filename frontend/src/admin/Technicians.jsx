const technicians = [
    {
        id: 1,
        name: "Amit Kumar",
        skill: "AC Expert",
        phone: "9876543210",
        status: "Verified"
    },
    {
        id: 2,
        name: "Rajesh Singh",
        skill: "Plumber",
        phone: "9876541230",
        status: "Pending"
    }
]

const Technicians = () => {
    return (
        <div className="p-5 mt-15 flex-1 p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-2 text-gray-900">Manage Technicians</h1>
            <p className="text-gray-500 mb-6">List of verified professionals</p>

            <div className="bg-white shadow rounded-lg p-6">
                <table className="w-full text-left border-collapse">
                    <thead className="border-b">
                        <tr>
                            <th className="py-3 px-4 font-medium text-gray-700">Name</th>
                            <th className="py-3 px-4 font-medium text-gray-700">Skill</th>
                            <th className="py-3 px-4 font-medium text-gray-700">Phone</th>
                            <th className="py-3 px-4 font-medium text-gray-700">Status</th>
                            <th className="py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {technicians.map((tech) => (
                            <tr key={tech.id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4">{tech.name}</td>
                                <td className="py-3 px-4">{tech.skill}</td>
                                <td className="py-3 px-4 text-gray-600">{tech.phone}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${tech.status === "Verified"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                        {tech.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 space-x-3">
                                    <button className="text-blue-600 hover:text-blue-800 focus:outline-none">Edit</button>
                                    <button className="text-red-500 hover:text-red-700 focus:outline-none">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Technicians