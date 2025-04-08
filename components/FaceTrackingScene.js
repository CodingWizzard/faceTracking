function FaceTrackingScene() {
    try {
        const canvasRef = React.useRef(null);
        const [isInitialized, setIsInitialized] = React.useState(false);

        React.useEffect(() => {
            if (!isInitialized) {
                initScene();
            }
            return () => {
                // Cleanup
            };
        }, [isInitialized]);

        const initScene = async () => {
            const canvas = canvasRef.current;
            const engine = new BABYLON.Engine(canvas, true);
            const scene = new BABYLON.Scene(engine);

            const camera = new BABYLON.ArcRotateCamera("camera",
                Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvas, true);

            const light = new BABYLON.HemisphericLight("light",
                new BABYLON.Vector3(0, 1, 0), scene);

            // Material für die Gesichtspunkte
            const pointMaterial = new BABYLON.StandardMaterial("pointMaterial", scene);
            pointMaterial.emissiveColor = new BABYLON.Color3(0, 0.7, 1); // Blaue Farbe

            // Array für alle Gesichtspunkte
            const facePoints = [];

            initFaceTracking((landmarks) => {
                if (landmarks && landmarks.length > 0) {
                    // Erstelle oder aktualisiere Punkte für jedes Landmark
                    landmarks.forEach((landmark, index) => {
                        if (!facePoints[index]) {
                            // Erstelle einen neuen Punkt, wenn er noch nicht existiert
                            const sphere = BABYLON.MeshBuilder.CreateSphere(
                                `point${index}`,
                                { diameter: 0.01 }, // Kleine Kugeln
                                scene
                            );
                            sphere.material = pointMaterial;
                            facePoints[index] = sphere;
                        }

                        // Aktualisiere die Position des Punktes
                        facePoints[index].position = new BABYLON.Vector3(
                            (landmark.x - 0.5) * 2,
                            -(landmark.y - 0.5) * 2,
                            -landmark.z
                        );
                    });
                }
            });

            engine.runRenderLoop(() => {
                scene.render();
            });

            window.addEventListener("resize", () => {
                engine.resize();
            });

            setIsInitialized(true);
        };

        return (
            <div data-name="face-tracking-container" className="canvas-container">
                <canvas data-name="render-canvas" ref={canvasRef} id="renderCanvas" />
            </div>
        );
    } catch (error) {
        console.error('FaceTrackingScene error:', error);
        reportError(error);
        return null;
    }
}


