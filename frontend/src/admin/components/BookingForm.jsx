const BookingForm = () => {
    return (
        <form className="flex flex-col gap-4 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Booking Form</h3>
            <input
                type="text"
                placeholder="Name"
                className="p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <input
                type="tel"
                placeholder="Phone Number"
                className="p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <select className="p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
                <option>Select Service</option>
                <option>AC Repair</option>
                <option>Plumbing</option>
                <option>Electrical</option>
            </select>
            <button
                type="submit"
                className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm active:scale-95"
            >
                Book Now
            </button>
        </form>
    );
};
export default BookingForm;
