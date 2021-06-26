import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";

export const Information = () => {
    const key = "";
    const [crypto, setCrypto] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        if (e.target.name == "crypto")
        setCrypto(e.target.value);
        if (e.target.name == "start")
        setStart(e.target.value);
        if (e.target.name == "end")
        setEnd(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let linkToAPI = "https://api.nomics.com/v1/currencies/sparkline?key=" + key + "&ids=" + crypto + "&start=" + start + "T00:00:00Z&end=" + end + "T00:00:00Z";
        try {
            let response = await axios.get(linkToAPI)
            console.log(response.data)
        } catch (error) {
            setError(error);
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Cryptocurrency:</label><br />
            <input type="text" id="crypto" name="crypto" onChange={handleChange}></input><br />
            <label>Start Date:</label><br />
            <input type="text" id="start" name="start" onChange={handleChange}></input><br />
            <label>End Date:</label><br />
            <input type="text" id="end" name="end" onChange={handleChange}></input><br />
            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
