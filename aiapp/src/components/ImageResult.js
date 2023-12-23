function ImageResult({response, status}) {
    return(
        <>  
            {status === 'pending' && (
                <h2>Working on it...</h2>
            )}
            {response && (
                <div>
                <h2>Server Response:</h2>
                <pre>{response}</pre>
                </div>
            )}
        </>
    )
}

export default ImageResult;