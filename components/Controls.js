function Controls({ onReset }) {
    try {
        return (
            <div data-name="controls" className="controls">
                <button 
                    data-name="reset-button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onReset}
                >
                    <i className="fas fa-redo mr-2"></i>
                    Reset View
                </button>
            </div>
        );
    } catch (error) {
        console.error('Controls error:', error);
        reportError(error);
        return null;
    }
}
