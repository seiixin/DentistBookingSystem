import React, { useState } from "react";
import { router } from "@inertiajs/react";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState(""); // New subject state
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    router.post(
      "/user/contact",
      {
        first_name: firstName,
        last_name: lastName,
        email,
        number: phoneNumber,
        subject,
        message,
      },
      {
        onSuccess: () => {
          alert(`Message sent from ${firstName} ${lastName}!`);
          // Clear the form
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhoneNumber("");
          setSubject("");
          setMessage("");
        },
        onError: (errors) => {
          alert("Please fix the errors and try again.");
          console.error(errors);
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-100 p-8 rounded-2xl shadow max-w-2xl w-full mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Contact Our Clinic
      </h2>

      {/* Input Fields */}
      {[
        { label: "First Name", value: firstName, setValue: setFirstName, type: "text" },
        { label: "Last Name", value: lastName, setValue: setLastName, type: "text" },
        { label: "Email Address", value: email, setValue: setEmail, type: "email" },
        { label: "Phone Number", value: phoneNumber, setValue: setPhoneNumber, type: "tel" },
        { label: "Subject", value: subject, setValue: setSubject, type: "text" },
      ].map(({ label, value, setValue, type }) => (
        <div key={label} className="mb-4">
          <label className="block text-blue-600 text-sm mb-2">{label}:</label>
          <input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type Here"
            required={label !== "Phone Number"} // Make phone optional
            className="w-full p-3 rounded-xl bg-blue-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}

      {/* Message Field */}
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

      {/* Submit Button */}
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
