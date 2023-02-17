import React from "react";
import { useNavigate } from "react-router-dom";

type NavigationProps = {
    title: string,
    children?: string
}

const Navigation = ({title, children}: NavigationProps) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("_id");
        localStorage.removeItem("_myEmail");
        navigate("/");
    };

    return (
        <nav className="navigation">
            <h2 className="navigation__title">{title}</h2>
            {children}
            <button className="logout__btn" onClick={handleLogout}>
                Log out
            </button>
        </nav>
    );
};

export default Navigation;
