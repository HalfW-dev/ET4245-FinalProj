const express = require('express');
const fs = require('fs');
const spawner = require("child_process").spawn;
const cors = require('cors');
const bodyParser = require("body-parser");

const imgGen = (imageUrl, response) => {

    fs.writeFile('inferredResult.json', response);
    fs.writeFile("temp.jpg", imageUrl, 'base64', function(err) {
        console.log(err);
    });
    
    const python_process = spawner('python3', ['./label.py']);
    console.log("Python called");

    python_process.on('close', function() {
        console.log("Done");
    })
    python_process.on('error', function(err) {
        console.error('Python process error:', err);
    });

}

const app = express();
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080

app.post('/infer', (req, res) => {
    console.log("Request received from frontend");

    const imgBase64 = req.body.imageUrl;
    const predictionResult = req.body.response;

    imgGen(imgBase64, predictionResult);

    console.log("Labeling done. Creating response");

    const inferredImage = fs.readFile("./labeled.jpg", {
        encoding: "base64"
    });

    res.send({inferredImage});
    console.log("Sending response...")
})

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});;