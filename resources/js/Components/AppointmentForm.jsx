import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

const AppointmentForm = ({
  data = {},
  setData = () => {},
  submit,
  processing = false,
  errors = {},
}) => {
  // Local state to track successful submission message
  const [successMessage, setSuccessMessage] = useState("");

  // Handler to wrap original submit and show success message on success
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous message
    setSuccessMessage("");

    // Make sure we have all required fields before submitting
    if (!data.patient_name || !data.date || !data.time || !data.treatment || !data.email || !data.number) {
      console.log("Missing required fields");
      return;
    }

    try {
      console.log("Form is being submitted with data:", data);
      // Call the original submit handler (which should be the one from BookAppointment.jsx)
      await submit(e);

      // If we get here, the submission was successful
      // Note: This might not execute if there's a page redirect from the backend
      setSuccessMessage("Booking successful!");
    } catch (error) {
      console.error("Error in form submission:", error);
      setSuccessMessage("");
    }
  };

  // Clear success message when any input changes
  useEffect(() => {
    setSuccessMessage("");
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit} // Note: This will call the handler that invokes the 'submit' prop
      className="bg-blue-100 p-8 rounded-2xl shadow max-w-2xl w-full mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Book an Appointment
      </h2>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
          {successMessage}
        </div>
      )}

      {/* Server Validation Errors Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <p className="font-semibold">Please correct the following errors:</p>
          <ul className="list-disc ml-5 mt-2">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error}</li>
            ))}
          </ul>
        </div>
      )}

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
          <option value="" disabled>
            Select a treatment
          </option>
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

      <div className="mb-4">
        <label className="block text-blue-600 text-sm mb-2">Email:</label>
        <input
          type="email"
          value={data.email || ""}
          onChange={(e) => setData("email", e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-blue-600 text-sm mb-2">Phone Number:</label>
        <input
          type="tel"
          value={data.number || ""}
          onChange={(e) => setData("number", e.target.value)}
          placeholder="09XXXXXXXXX"
          required
          className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.number && (
          <p className="text-red-600 text-sm mt-1">{errors.number}</p>
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
