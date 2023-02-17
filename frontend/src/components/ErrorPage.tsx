import React from "react";
import { Link } from "react-router-dom";

type ErrorPageProps = {
    error: string,
    children?: string
}

const ErrorPage = ({ error }: ErrorPageProps) => {
    return (
        <div className='errorContainer'>
            <h2 style={{ marginBottom: "30px" }}>{error}</h2>
            <Link to='/'>Go Home</Link>
        </div>
    );
};

export default ErrorPage;
