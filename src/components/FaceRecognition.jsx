import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate, useLocation } from "react-router-dom";

function FaceRecognition() {
    const [recognized, setRecognized] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract course ID from state (passed during navigation)
    const courseId = location.state?.courseId || "";

    const captureAndRecognize = async () => {
        if (!webcamRef.current) return;

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            alert("Failed to capture image");
            return;
        }

        const blob = await fetch(imageSrc).then((res) => res.blob());
        const formData = new FormData();
        formData.append("image", blob, "webcam.jpg");

        try {
            const response = await fetch("http://127.0.0.1:5001/recognize", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (data.name && data.name !== "Unknown") {
                setRecognized(true);
                navigate(`/course-progress/${courseId}`);
            } else {
                alert("Face not recognized. Redirecting to home.");
                navigate(`/home`);
            }
        } catch (error) {
            console.error("Error recognizing face:", error);
            alert("Failed to recognize face.");
            navigate(`/home`);
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Face Recognition Access
            </h2>

            <div className="flex flex-col items-center gap-6">
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="border-4 border-gray-700 rounded-xl shadow-lg w-[400px] h-[300px] object-cover"
                />
                <button
                    onClick={captureAndRecognize}
                    className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Verify Face
                </button>
            </div>
        </div>
    );
}

export default FaceRecognition;
