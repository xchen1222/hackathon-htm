import { React, useEffect, useContext } from 'react'
import { Searchbar } from '../components/Searchbar'
import { InfoContext } from "../utils/InfoContext";

export const Test = () => {
  const { info, setInfo } = useContext(InfoContext);

  useEffect(() => {
    console.log(info);
  }, [info])

  return (
    <div>
      <h1> This is the testing page </h1>
      <Searchbar />
      <button onClick={() => setInfo(null)}>
        Reset Cache
      </button>
    </div>
  )
}
