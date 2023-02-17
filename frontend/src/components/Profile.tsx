import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScheduleTypes } from "../types";
import { fetchUserDetails } from "../utils/resource";
import Navigation from "./Navigation";

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [timezone, setTimezone] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("_id")) {
            navigate("/");
        }

        fetchUserDetails(id as string, setSchedules, setUsername, setTimezone, setLoading);
    }, [navigate, id]);

    if (loading) {
        return <div> Loading ...</div>
    };

    return (
        <main className='profile'>
            <Navigation title="Profile Page" />
            <div className="profile__main" style={{ width: "70%" }}>
                <h2>Hey, {username}</h2>
                <p>Here is your schedule: {timezone}</p>
                <table>
                    <tbody>
                        {schedules.map((schedule: ScheduleTypes, k: number) => (
                            <tr key={k}>
                                <td>{schedule?.day}</td>
                                <td>{schedule?.startTime}</td>
                                <td>{schedule?.endTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Profile;
