import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const dobDate = new Date(dob);

    if (number.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }

    if (currentDate < dobDate) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    }
  };

  return (
    <>
      <div className="hb">
        <h1>User Details Modal</h1>
        <button className="primary-button" onClick={handleClick}>
          Open Form
        </button>

        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <h1>Fill Details</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="number">Phone Number:</label>
                <input
                  type="number"
                  id="phone"
                  name="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />

                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />

                <button type="submit" className="primary-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
