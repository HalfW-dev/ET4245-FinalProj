import axios from 'axios';
import { useState, useEffect } from 'react';

function ImageGeneration({imageUrl, response, status}) {
    const [imgBase64, setImgBase64] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define a separate function for the asynchronous operation
        const fetchData = async () => {
            try {
                // Make the POST request
                const result = await axios.post(
                    "http://localhost:8080/infer",
                    {
                        imageUrl: imageUrl.split(',')[1],
                        response: response,
                    }
                );

                // Access the inferredImage property from the result
                const newImgBase64 = `data:image/jpeg;base64,${result.data.inferredImage}`;

                // Update the component state
                setImgBase64(newImgBase64);
            } catch (error) {
                console.error("Error:", error);
                // Handle error and update the component state
                setError(error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, [imageUrl, response, status]); // Include dependencies in the dependency array
    return(
        <>
            {status === 'done' && 
                <div>
                    <h2>Inferred Image</h2>
                    <img src={imgBase64} 
                        alt="Selected" 
                        style={{ maxWidth: '100%', maxHeight: '1000px' }} 
                    />
                </div>
            }
        </>
    )
}

export default ImageGeneration;