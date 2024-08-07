import React, { useState, useEffect, useRef } from "react";
import "./Modal.css";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");

  const modalRef = useRef(null);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const dobDate = new Date(dob);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email. Please check your email address.");
    }

    if (phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }

    if (currentDate < dobDate) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    }
    setIsOpen(false);
    setPhone("");
    setDob("");
    setEmail("");
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="hb">
        <h1>User Details Modal</h1>
        <button className="submit-button" onClick={handleClick}>
          Open Form
        </button>

        {isOpen && (
          <div className="modal">
            <div className="modal-content" ref={modalRef}>
              <h1>Fill Details</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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

                <button type="submit" className="submit-button">
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
