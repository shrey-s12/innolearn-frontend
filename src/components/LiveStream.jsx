import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

function LiveStream() {
    const [meetingLink, setMeetingLink] = useState(""); // State for Meeting Link
    const [loading, setLoading] = useState(false); // State for loading
    const [message, setMessage] = useState(""); // State for success or error messages
    const [liveData, setLiveData] = useState([]); // State for storing fetched data
    const [loadingData, setLoadingData] = useState(true); // State for data loading

    const { id } = useParams();

    // Fetch all data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${MAIN_URL}/api/live/get`);
                const data = await response.json();
                if (data.success) {
                    setLiveData(data.data); // Set the fetched data to state
                } else {
                    setMessage("Error fetching live streams.");
                }
            } catch (error) {
                console.error("Error:", error);
                setMessage("Error fetching live streams.");
            } finally {
                setLoadingData(false); // Set data loading state to false
            }
        };

        fetchData();
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(`${MAIN_URL}/api/live/live`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseId: id, meetingLink }), // Send courseId and meetingLink
            });

            const data = await response.json();
            if (data.success) {
                setMessage("Live Stream Link Shared Successfully!");
                setLiveData([...liveData, data.data]); // Add new data to list
            } else {
                setMessage("Error sharing live stream link.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error sharing live stream link.");
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    // Function to delete a live stream by ID
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${MAIN_URL}/api/live/delete/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();
            if (data.success) {
                setMessage("Live Stream deleted successfully!");
                setLiveData(liveData.filter((item) => item._id !== id)); // Remove deleted item from state
            } else {
                setMessage("Error deleting live stream.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error deleting live stream.");
        }
    };

    return (
        <div className="live-stream-container text-gray-900 dark:text-gray-100">
            <h2 className="text-2xl font-bold mb-4">Share Live Stream Link</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label htmlFor="courseId" className="block text-sm font-semibold dark:text-gray-300">Course ID</label>
                    <input
                        type="text"
                        id="courseId"
                        value={id}
                        placeholder="Enter Course ID"
                        className="w-[500px] p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="meetingLink" className="block text-sm font-semibold dark:text-gray-300">Meeting Link</label>
                    <input
                        type="text"
                        id="meetingLink"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        placeholder="Enter Meeting Link"
                        className="w-[500px] p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded"
                        required
                    />
                </div>

                <div className="form-group flex justify-between items-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400 dark:disabled:bg-gray-500"
                        disabled={loading}
                    >
                        {loading &&
                            (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>)
                        }

                        {!loading ? "Share Live Stream" : "Sharing..."}
                    </button>
                </div>
            </form>

            {message && (
                <div className="mt-4 text-sm">
                    <p className={message.includes("Successfully") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                        {message}
                    </p>
                </div>
            )}

            <div className="live-data-list mt-8">
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Live Streams</h3>
                {loadingData ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {liveData.map((item) => (
                            <li
                                key={item._id}
                                className="flex justify-between items-center p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                            >
                                <span className="text-black dark:text-white">
                                    <strong>Course ID:</strong> {item.courseId} <br />
                                    <strong>Meeting Link:</strong> {item.meetingLink}
                                </span>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default LiveStream;
