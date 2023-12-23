import {useState} from 'react';
import ImageForm from './components/ImageForm';
import ImagePreview from './components/ImagePreview';
import ImageResult from './components/ImageResult';
import ImageGeneration from './components/ImageGeneration';

function App() {
    const [status, setStatus] = useState('standby'); //standby, pending, done

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('')

    const [response, setResponse] = useState('');
    
    return(
      <>
        <h1>Image Upload and HTTP Request</h1>
        <ImageForm image={image} setImage={setImage} response={response} setResponse={setResponse} setStatus={setStatus}/>
        <ImagePreview image={image} imageUrl={imageUrl} setImageUrl={setImageUrl} />
        {status === 'done' && <ImageGeneration imageUrl={imageUrl} response={response} status={status}/>}
        <ImageResult response={response} status={status}/>
      </>
    )
}

export default App;