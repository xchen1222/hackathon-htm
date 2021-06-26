import { React, useContext } from 'react'
import { Link } from 'react-router-dom'
import { InfoContext } from "../utils/InfoContext";

export const Home = () => {
    const { info, setInfo } = useContext(InfoContext);

    const handleReset = () => {
      
      setInfo(null);
      console.log(info);

    }
    
    return (
        <div>
            <h1> Home Page </h1>
            <Link to="/information">Click here to go to inforamation page</Link> <br/>
            <button onClick={ handleReset }>
              Reset Cache
            </button>
        </div>
    )
}

