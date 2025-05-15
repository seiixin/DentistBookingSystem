import React, { useState } from "react";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent from ${firstName} ${lastName}!`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-100 p-8 rounded-2xl shadow max-w-2xl w-full mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Contact Our Clinic
      </h2>

      {[
        { label: "First Name", state: firstName, setState: setFirstName, type: "text" },
        { label: "Last Name", state: lastName, setState: setLastName, type: "text" },
        { label: "Email Address", state: email, setState: setEmail, type: "email" },
        { label: "Phone Number", state: phoneNumber, setState: setPhoneNumber, type: "tel" },
      ].map(({ label, state, setState, type }) => (
        <div key={label} className="mb-4">
          <label className="block text-blue-600 text-sm mb-2">{label}:</label>
          <input
            type={type}
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Type Here"
            required={label !== "Phone Number"} // Phone optional
            className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}

      <div className="mb-6">
        <label className="block text-blue-600 text-sm mb-2">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type Here"
          required
          rows={4}
          className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-blue-300 text-blue-900 font-semibold shadow-[5px_5px_15px_#93c5fd,-5px_-5px_15px_#bfdbfe] hover:shadow-inner hover:text-blue-700 transition duration-200"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
