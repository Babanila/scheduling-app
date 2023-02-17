import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScheduleTypes } from "../types";
import { fetchBookingDetails, sendEmail } from "../utils/resource";
import ErrorPage from "./ErrorPage";

const BookUser = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [schedules, setSchedules] = useState([]);
	const [timezone, setTimezone] = useState("");
	const [duration, setDuration] = useState("");
	const [error, setError] = useState(false);
	const [receiverEmail, setReceiverEmail] = useState("");

	const { user } = useParams();

	const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		sendEmail(receiverEmail, email, fullName, message, duration);
		setFullName("");
		setMessage("");
	};

	useEffect(() => {
		fetchBookingDetails(
			user,
			setError,
			setTimezone,
			setSchedules,
			setReceiverEmail
		);
	}, [user]);

	if (error) {
		return <ErrorPage error="User doesn't exist" />;
	}
	return (
		<div className='bookContainer'>
			<h2 className='bookTitle'>Book a session with {user}</h2>
			<form onSubmit={handleSubmit} className='booking__form'>
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

				<label htmlFor='session'>
					Select your preferred session - {timezone}
				</label>
				<select name='duration' onChange={(e) => setDuration(e.target.value)}>
					{schedules.map((schedule: ScheduleTypes) => (
						<option
							value={`${schedule.day} - ${schedule.startTime} : ${schedule.endTime}`}
							key={schedule.day}
						>{`${schedule.day} - ${schedule.startTime} : ${schedule.endTime}`}</option>
					))}
				</select>
				<button className='bookingBtn'>SEND</button>
			</form>
		</div>
	);
};

export default BookUser;

/*
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
*/
