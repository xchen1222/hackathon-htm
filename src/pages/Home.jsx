import { React, useContext } from 'react'
import { Link } from 'react-router-dom'
import { InfoContext } from "../utils/InfoContext";

export const Home = () => {
    const { info, setInfo } = useContext(InfoContext);

    return (
        <div>
            <h1> Home Page </h1>
            <Link to="/landingPage">Click here to go to landing page</Link> <br/>
            <Link to="/information">Click here to go to information page</Link> <br/>
            <button onClick={() => setInfo(null)}>
                
              Reset Cache
            </button>
            
        </div>
    )
}

