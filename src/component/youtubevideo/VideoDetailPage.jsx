import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "/VideoDetail.css";

const VideoDetailPage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch video details từ API
    useEffect(() => {
        const fetchVideo = async () => {
            try {
              const response = await axios.get(`http://localhost:8080/${id}`);
                setVideo(response.data);
            } catch (err) {
                setError("Không thể tải thông tin video. Vui lòng thử lại sau.");
                console.error("Error fetching video:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [id]);

    // Khi đang tải dữ liệu
    if (loading) {
      return <p>Loading videos...</p>;
  }

    // Khi có lỗi
    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
            </div>
        );
    }

    // Khi video không tồn tại
    if (!video) {
        return (
            <div className="not-found-container">
                <p>Video không tồn tại hoặc đã bị xóa.</p>
            </div>
        );
    }

    // Lấy videoId từ URL YouTube

    // Render chi tiết video
    return (
        <div className="video-detail-page">
            {/* Phần Video */}
            <div className="video-container">
                <iframe
                    className="video-iframe"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Phần Chi Tiết */}
            <div className="video-details">
                <h1>{video.title}</h1>
                <p className="video-description">{video.description}</p>
            </div>

            {/* Phần Transcriptions */}
            <div className="transcription-section">
                <h2>Transcriptions</h2>
                <ul className="transcription-list">
                    {video.transcriptions.map((item, index) => (
                        <li key={index} className="transcription-item">
                            <span className="transcription-time">
                                {item.startTime}  
                            </span>
                            <span className="transcription-text">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VideoDetailPage;
