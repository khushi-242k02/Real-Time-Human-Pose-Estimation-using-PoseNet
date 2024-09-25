let capture;
let posenet;
let singlePose, skeleton;
let specs;

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO);
    capture.size(800, 500);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);

    specs=loadImage('images/spects.png');
}

function receivedPoses(poses) {
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton=poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    // images and VideoColorSpace(webcam )
    image(capture, 0, 0, 800, 500);
    if (singlePose) {
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            let keypoint = singlePose.keypoints[i];
            if (keypoint.score > 0.2) { // Only draw keypoints with a confidence score above 0.2
                fill(0, 255, 0);
                ellipse(keypoint.position.x, keypoint.position.y, 20, 20);
            }
        }
        // Draw skeleton
        stroke(255, 255, 255); // Set line color
        strokeWeight(2); // Set line thickness
        for (let j=0;j<skeleton.length;j++){
            line(skeleton[j][0].position.x,skeleton[j][0].position.y,skeleton[j][1].position.x,skeleton[j][1].position.y)
        }
        image(specs,singlePose.nose.x-100,singlePose.nose.y-140,200,200);
    }
}
