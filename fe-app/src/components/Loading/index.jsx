function Loading() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-300 dark:bg-gray-700 bg-opacity-50 z-50">
            <div className="border-2 border-white rounded-full h-10 w-10 animate-spin">
                <div className="border-t-2 border-white rounded-full h-full w-full"></div>
            </div>
        </div>
    );
}

export default Loading;
