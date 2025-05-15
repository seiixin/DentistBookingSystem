import React from "react";
import { Link } from "@inertiajs/react";

const AppointmentForm = ({ data = {}, setData = () => {}, submit, processing = false, errors = {} }) => {
  return (
    <form
      onSubmit={submit}
      className="bg-blue-100 p-8 rounded-2xl shadow max-w-2xl w-full mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Book an Appointment
      </h2>

      {/* Input Fields */}
      <div className="mb-4">
        <label className="block text-blue-600 text-sm mb-2">Full Name:</label>
        <input
          type="text"
          value={data.patient_name || ""}
          onChange={(e) => setData("patient_name", e.target.value)}
          placeholder="Type Here"
          required
          className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.patient_name && (
          <p className="text-red-600 text-sm mt-1">{errors.patient_name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-blue-600 text-sm mb-2">Pick a Date:</label>
        <input
          type="date"
          value={data.date || ""}
          onChange={(e) => setData("date", e.target.value)}
          required
          className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.date && (
          <p className="text-red-600 text-sm mt-1">{errors.date}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-blue-600 text-sm mb-2">Time:</label>
        <input
          type="time"
          value={data.time || ""}
          onChange={(e) => setData("time", e.target.value)}
          required
          className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.time && (
          <p className="text-red-600 text-sm mt-1">{errors.time}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-blue-600 text-sm mb-2">Treatment:</label>
        <select
          value={data.treatment || ""}
          onChange={(e) => setData("treatment", e.target.value)}
          required
          className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Select a treatment</option>
          <option value="Teeth Cleaning">Teeth Cleaning</option>
          <option value="Root Canal">Root Canal</option>
          <option value="Whitening Treatment">Whitening Treatment</option>
          <option value="Fillings">Fillings</option>
          <option value="Cavity Check">Cavity Check</option>
          <option value="Dental Checkup">Dental Checkup</option>
        </select>
        {errors.treatment && (
          <p className="text-red-600 text-sm mt-1">{errors.treatment}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={processing}
        className="w-full py-3 rounded-xl bg-blue-300 text-blue-900 font-semibold shadow-[5px_5px_15px_#93c5fd,-5px_-5px_15px_#bfdbfe] hover:shadow-inner hover:text-blue-700 transition duration-200"
      >
        {processing ? "Booking..." : "Create Ticket"}
      </button>

      {/* Call to Action */}
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
