import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { sendEmail } from "../utils/resource";

const BookUser = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [receiverEmail, setReceiverEmail] = useState("");
    const [message, setMessage] = useState("");
    const [duration, setDuration] = useState(30);
    const { user } = useParams();

    const handleSubmit = (e: { preventDefault: () => void; }): void => {
        e.preventDefault();
        sendEmail(receiverEmail, email, fullName, message, duration);
        setEmail("");
        setFullName("");
        setMessage("");
        setReceiverEmail("");
        setDuration(30);
    };

    return (
        <div className='bookContainer'>
            <h2 className='bookTitle'>Book a session with {user}</h2>
            <form className='booking__form' onSubmit={handleSubmit}>
                <label htmlFor='fullName'>Full Name</label>
                <input
                    id='fullName'
                    name='fullName'
                    type='text'
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor='email'>Email Address</label>
                <input
                    id='email'
                    name='email'
                    required
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='message'>Any important note? (optional)</label>
                <textarea
                    rows={5}
                    name='message'
                    id='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <label htmlFor='email'>Receiver Email Address</label>
                <input
                    id='receiverEmail'
                    name='receiverEmail'
                    required
                    type='email'
                    value={receiverEmail}
                    onChange={(e) => setReceiverEmail(e.target.value)}
                />

                // TODO: Change to time selection(Duration)
                <label htmlFor='session'>
                    Select your preferred session - GMT+2 Jerusalem
                </label>
                <button className='bookingBtn' onClick={handleSubmit}>SEND</button>
            </form>
        </div>
    );
};

export default BookUser;
