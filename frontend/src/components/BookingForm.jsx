const BookingForm = () => {
    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Quick Booking Form</h3>
            <input type="text" placeholder="Name" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
            <input type="tel" placeholder="Phone Number" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
            <select style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option>Select Service</option>
                <option>AC Repair</option>
                <option>Plumbing</option>
                <option>Electrical</option>
            </select>
            <button type="submit" className="btn btn-primary">Book Now</button>
        </form>
    );
};
export default BookingForm;
