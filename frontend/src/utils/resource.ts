import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { NavigateFunction } from "react-router-dom";

export const time = [
    { id: "null", t: "Select" },
    { id: "7", t: "7:00am" },
    { id: "8", t: "8:00am" },
    { id: "9", t: "9:00am" },
    { id: "10", t: "10:00am" },
    { id: "11", t: "11:00am" },
    { id: "12", t: "12:00pm" },
    { id: "13", t: "13:00pm" },
    { id: "14", t: "14:00pm" },
    { id: "15", t: "15:00pm" },
    { id: "16", t: "16:00pm" },
    { id: "17", t: "17:00pm" },
    { id: "18", t: "18:00pm" },
    { id: "19", t: "19:00pm" },
];

export async function handleLogin(
    username: string,
    password: string,
    navigate: NavigateFunction,
    ) {
    try {
        const request = await fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const data = await request.json();

        if (data.error_message) {
            toast.error(data.error_message);
        } else {
            toast.success(data.message);
            localStorage.setItem("_id", data.data._id);
            localStorage.setItem("_myEmail", data.data._email);
            navigate("/dashboard");
        }
    } catch (err) {
        console.error(err);
    }
}

export async function handleRegister(
    email: string,
    username: string,
    password: string,
    navigate: NavigateFunction,
    ) {
    try {
        const request = await fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                username,
                password,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const data = await request.json();

        if (data.error_message) {
            toast.error(data.error_message);
        } else {
            toast.success(data.message);
            navigate("/");
        }
    } catch (err) {
        console.error(err);
        toast.error("Account creation failed");
    }
}

export async function handleCreateSchedule(
    selectedTimezone: any,
    schedule: any,
    navigate: (arg0: string) => void
) {
    try {
        await fetch("http://localhost:5000/schedule/create", {
            method: "POST",
            body: JSON.stringify({
                userId: localStorage.getItem("_id"),
                timezone: selectedTimezone,
                schedule,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        navigate(`/profile/${localStorage.getItem("_id")}`);
    } catch (err) {
        console.error(err);
    }
}

export function fetchBookingDetails(
    user: any,
    setError: (arg0: boolean) => void,
    setTimezone: (arg0: any) => void,
    setSchedules: (arg0: any) => void,
    setReceiverEmail: (arg0: any) => void
) {
    fetch(`http://localhost:5000/schedules/${user}`, {
        method: "POST",
        body: JSON.stringify({
            username: user,
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error_message) {
                toast.error(data.error_message);
                setError(true);
            } else {
                setTimezone(data.timezone.label);
                setSchedules(data.schedules);
                setReceiverEmail(data.receiverEmail);
            }
        })
        .catch((err) => console.error(err));
}

export const sendEmail = (
    receiverEmail: any,
    email: any,
    fullName: any,
    message: any,
    duration: any
) => {
    emailjs
        .send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID ?? "YOUR_SERVICE_ID",
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID",
            {
                to_email: receiverEmail,
                from_email: email,
                fullName,
                message,
                duration,
            },
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY ?? "YOUR_PUBLIC_KEY"
        )
        .then(
            (result) => {
                console.log(result.text);
                toast.success("Session booked successfully!");
            },
            (error) => {
                console.log(error.text);
                toast.error(error.text);
            }
        );
};

export const fetchUserDetails = (
    inputId: string,
    setSchedules: (arg0: any) => void,
    setUsername: (arg0: any) => void,
    setTimezone: (arg0: any) => void,
    setLoading: (arg0: any) => void,
    ) => {
        fetch(`http://localhost:5000/schedules/${inputId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error_message) {
                    toast.error(data.error_message);
                }  else {
                    setUsername(data.username);
                    setSchedules(data.schedules);
                    setTimezone(data.timezone.label);
                    setLoading(false);
                }
            })
            .catch((err) => console.error(err));
};
