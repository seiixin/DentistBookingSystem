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
    <form
      onSubmit={handleSubmit}
      className="bg-blue-100 p-8 rounded-2xl shadow max-w-2xl w-full mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Book an Appointment
      </h2>

      {[
        { label: "Full Name", type: "text", state: fullName, setState: setFullName },
        { label: "Phone Number", type: "tel", state: phoneNumber, setState: setPhoneNumber },
        { label: "Email Address", type: "email", state: email, setState: setEmail },
        { label: "Date of Birth", type: "date", state: dob, setState: setDob },
        { label: "Pick a Date", type: "date", state: appointmentDate, setState: setAppointmentDate },
      ].map(({ label, type, state, setState }) => (
        <div key={label} className="mb-4">
          <label className="block text-blue-600 text-sm mb-2">{label}:</label>
          <input
            type={type}
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Type Here"
            required
            className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-blue-600 text-sm mb-2">Treatment:</label>
        <select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          required
          className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select a treatment
          </option>
          <option value="treatment1">Teeth Cleaning</option>
          <option value="treatment2">Root Canal</option>
          <option value="treatment3">Whitening Treatment</option>
          <option value="treatment3">Fillings</option>
          <option value="treatment3">Cavity Check</option>
          <option value="treatment3">Dental Checkup</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-blue-600 text-sm mb-2">Remarks (optional):</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Type Here"
          className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-blue-300 text-blue-900 font-semibold shadow-[5px_5px_15px_#93c5fd,-5px_-5px_15px_#bfdbfe] hover:shadow-inner hover:text-blue-700 transition duration-200"
      >
        Create Ticket
      </button>

      <div className="text-center mt-6">
        <p className="text-sm text-blue-600">Register an account to track your history!</p>
        <Link
          href="/register"
          className="inline-block mt-3 py-2 px-6 rounded-xl bg-blue-300 text-blue-900 font-medium shadow-[5px_5px_15px_#93c5fd,-5px_-5px_15px_#bfdbfe] hover:shadow-inner hover:text-blue-700 transition duration-200"
        >
          Register Account
        </Link>
      </div>
    </form>
  );
};

export default AppointmentForm;
