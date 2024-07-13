import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { SyncLoader } from 'react-spinners';
import axios from 'axios';
import './App.css'

const API_URL="https://dog.ceo/api/breeds/image/random"

let initialLoad = true;

function App() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (initialLoad) {
      getDog();
      initialLoad = false;
    }
  }, []);

  useEffect(() => {

    // setInterval(function, X ms) -> runs a function every X ms
    const myTimer = setInterval(() => {
      setSeconds(prevState => prevState + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(myTimer);
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Digit1") {
        getDog();
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  }, [])

  // https://react.dev/learn/synchronizing-with-effects#fetching-data
  // useEffect(() => {
  //   let ignore = false;

  //   async function initialFetch() {
  //     const response = await axios.get(API_URL);
  //     if (!ignore) {
  //       setDogs(prevState => {
  //         return [...prevState, { id: uuid(), url: response.data.message }]
  //       });
  //     }
  //   }

  //   initialFetch();

  //   // When component is unmounted or before the effect rus again
  //   return () => {
  //     ignore = true;
  //   }

  // }, []);

  // DON'T DO THIS!!!
  // axios.get(API_URL).then(response => {
  //   console.log(response.data.message);
  //   setDog(response.data.message);
  // });

  const getDog = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setDogs(prevState => {
        return [...prevState, { id: uuid(), url: response.data.message }]
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>Async Demo</h1>
      <div className="buttons-container">
        <button onClick={getDog}>Get Dog</button>
        <div>{seconds} elapsed</div>
      </div>
      {dogs.length > 0 && (
        <div className='dogs-container'>
          {dogs.map(dog => (
            <img key={dog.id} src={dog.url} className='dog-item' />
          ))}
          {isLoading && <SyncLoader className='spinner-container' color='#5f3dc4' />}
        </div>
      )}
    </>
  )
}

export default App
