import axios from "axios";
import { useEffect, useState } from "react";

function EffectExample() {
    const[selectedId, setSelectedId] = useState(1);
    const[customer, setCustomer] = useState(null);

    useEffect(() => {

        let ignore = false;

        // Declaration of getCustomer() function
        const getCustomer = async (id) => {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/users${id}`
            )

            // Simulate a delay happened with Customer 2
            if (selectedId === 2) {
                setTimeout(() => {
                    if (!ignore) setCustomer(response.data);
                }, 3000);
            } else {
                setCustomer(response.data);
            }
            setCustomer(response.data);
        };

        getCustomer(selectedId);

        // Cleanup function
        // This runs when the component is unmounted OR before the effect runs again
        return () => {
            ignore = true;
        }
    }, [selectedId]);

    return (
        <div>
            <h1>Effect Example</h1>
            <button onClick={() => setSelectedId(1)} disabled={selectedId === 1}>1: Leanne</button>
            <button onClick={() => setSelectedId(2)} disabled={selectedId === 2}>2: Ervin</button>
            <button onClick={() => setSelectedId(3)} disabled={selectedId === 3}>3: Clementine</button>
        
            {customer && (
                <div>

                </div>
            )}
        </div>

    );
}

export default EffectExample;