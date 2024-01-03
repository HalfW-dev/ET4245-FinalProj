# Introduction
This is a university final project for the ET4245 - AI and Applications class at Hanoi University of Science and Technology. 99.99% was done by me (we were a group of 2).

This application can take in a picture of a valid winning Riichi hand, and then return the list of yaku that the hand has achieved. It uses YOLOv8 (hosted on Roboflow) to detect the tiles and pass that information back to the application, which then uses a utility function to calculate the yaku.

# Application Flow
1. User uploads an image.
2. The image is sent to the YOLOv8 custom trained model hosted on Roboflow, via Roboflow API.
3. Roboflow AI returns the inferrence result, containing the detected classes and their bounding box locations.
4. The inferrence result is sent to the backend for image labeling.
5. The utility function pulls the list of classes from the inferrence result and begins score calculation.
6. The labelled image is displayed along with the yaku list and the inferrence result (mainly for debugging, might remove in the future).
7. An option list is provided to change the situational yaku.

# Technology Used
### YOLOv8:
One of the most advanced algorithm you can use for Computer Vision and Object Detection specifically. This custom YOLOv8 model we are using was trained for roughly 50 epochs, on a dataset consists of more than 400 images.

### Roboflow:
The main tool used for image labeling for the dataset, and for hosting the YOLOv8 model. The application uses the Roboflow API to send the input image to the hosted YOLOv8 model and receive a response containing the inferrence result.

### React:
The main driver for the frontend.

### TypeScript:
The utility function is written in TypeScript, as the scoring functionality is provided by [a library written in TypeScirpt.](https://github.com/MahjongPantheon/riichi-ts)

### Python:
The script for labeling the image was written in Python, to utilize its powerful and readily available image manipulation libraries.

### NodeJS/Express:
The main driver for the backend.

# Usage
The application is pretty rudimentary since its not the main focus for this project. However, using it should not be too hard.
```
git clone https://github.com/HalfW-dev/ET4245-FinalProj.git
cd ET4245-FinalProj
cd aiapp
npm start
```
That should boot up the React frontend, you can access it at by default at localhost:3000.
Now make a new terminal for the backend instance:
```
cd ET4245-FinalProj/backend
node backend.js
```
That should boot up the NodeJS/Express backend.
Remember to run `npm install` if it's your first time running the application in the `aiapp` and `backend` folders.

# FAQ
### Why Riichi?
I started playing Riichi recently (September 2023) and I really love the game. I took the chance to do this project to show my love to the game, as well as to derust my React skills .

### Why making a separated backend for labeling the images?
Roboflow API does not support labeling images after running them through the model (they instruct users how to label the images locally instead), so I have to do it locally for now. Unfortunately, React, like any other browser-enclosed (or sandboxed) technology, does not have access to the local file system, and also can't run the Python script directly (would be great if there's a way but there's none afaik).
So I just opted for a dedicated backend service that would do all of the above work.

### Future plans?
Of course! I plan to do the following:
- Beautify the app with CSS.
- Extend detection for many tiles art.
- Improve the data transport format through HTTP.
- Add support for manual tiles picking.