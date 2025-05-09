import React, { useState } from "react";
import { Link } from "@inertiajs/react";


const AppointmentForm = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [treatment, setTreatment] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your appointment has been booked successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
      <label className="block text-sm font-medium">Full Name:</label>
      <input
        type="text"
        placeholder="Type Here"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        required
      />

      <label className="block text-sm font-medium mt-4">Phone Number:</label>
      <input
        type="tel"
        placeholder="Type Here"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        required
      />

      <label className="block text-sm font-medium mt-4">Email Address:</label>
      <input
        type="email"
        placeholder="Type Here"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        required
      />

      <label className="block text-sm font-medium mt-4">Date of Birth:</label>
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        required
      />

      <label className="block text-sm font-medium mt-4">Treatment:</label>
      <select
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        required
      >
        <option value="" disabled selected>
          Select a treatment
        </option>
        <option value="treatment1">Treatment 1</option>
        <option value="treatment2">Treatment 2</option>
        <option value="treatment3">Treatment 3</option>
      </select>

      <label className="block text-sm font-medium mt-4">Pick a Date:</label>
      <input
        type="date"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        required
      />

      <label className="block text-sm font-medium mt-4">Remarks (optional):</label>
      <textarea
        placeholder="Type Here"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        className="w-full p-3 mt-2 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-md mt-6 hover:bg-blue-600"
      >
        Create Ticket
      </button>

        <div className="text-center mt-6">
            <p className="text-sm">Register an Account to track your history!</p>
            <Link
            href="/register"
            className="inline-block bg-blue-500 text-white py-2 px-6 rounded-md mt-2 hover:bg-blue-600 text-center"
            >
            Register Account
            </Link>

        </div>
    </form>
  );
};

export default AppointmentForm;
