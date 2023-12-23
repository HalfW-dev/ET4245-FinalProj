function ImagePreview({image, imageUrl, setImageUrl}) {

    const reader = new FileReader();

    reader.onloadend = () => {
        setImageUrl(reader.result);
    };

    if (image) {
        reader.readAsDataURL(image);
    }
    return(
        <>
            {imageUrl &&
                <div>
                    <h2>Image Preview</h2> 
                    <img src={imageUrl} 
                        alt="Selected" 
                        style={{ maxWidth: '100%', maxHeight: '1000px' }} 
                    />
                </div>
            }
        </>
    )
}

export default ImagePreview;