async function initFaceTracking(onFaceLandmarks) {
    const faceMesh = new FaceMesh({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        }
    });

    faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    faceMesh.onResults((results) => {
        if (results.multiFaceLandmarks) {
            const landmarks = results.multiFaceLandmarks[0];
            onFaceLandmarks(landmarks);
        }
    });

    const camera = new Camera(document.createElement('video'), {
        onFrame: async () => {
            await faceMesh.send({ image: camera.video });
        },
        width: 640,
        height: 480
    });

    camera.start();
}
