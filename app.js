function App() {
    try {
        const handleReset = () => {
            window.location.reload();
        };

        return (
            <div data-name="app-container">
                <FaceTrackingScene />
                <Controls onReset={handleReset} />
            </div>
        );
    } catch (error) {
        console.error('App error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
