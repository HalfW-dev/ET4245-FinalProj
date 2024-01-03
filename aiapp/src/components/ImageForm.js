import axios from 'axios';
import key from './key';

function ImageForm({image, setImage, response, setResponse, setStatus}) {

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const sendImage = async () => {
        try {
            console.time()
            setStatus('pending');

            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);

            fileReader.onload = async () => {
                const formData = new FormData();
                formData.append("file", image);

                const result = await axios.post(
                    "https://detect.roboflow.com/riichi-mahjong/7",
                    formData,
                    {
                        params: {
                            api_key: key,
                        },
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                setResponse(JSON.stringify(result.data, null, 2));
                setStatus('done');
            }
        } catch(error) {
            console.error('Error sending image:', error.message);
            console.log('Error response:', error.response.data);
        }
    };

    return(
        <>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={sendImage}>Send Image</button>
        </>
    )
}

export default ImageForm;