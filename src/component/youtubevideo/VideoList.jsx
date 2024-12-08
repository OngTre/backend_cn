import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '/VideoList.css'; // Import file CSS
import { Link } from 'react-router-dom';
const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchVideos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/list');
            setVideos(response.data);
        } catch (err) {
            setError('Error fetching videos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    if (loading) {
        return <p>Loading videos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="video-list">
            <h1>Video List</h1>
            <div className="video-grid">
                {videos.length === 0 ? (
                    <p>No videos available.</p>
                ) : (
                    videos.map((video) => (
                        <div className="video-card" key={video.id}>
                        <h3>{video.title}</h3>
                        <iframe
                            className="video-iframe"
                            src={`https://www.youtube.com/embed/${video.videoId}`}
                            title={video.title}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                        <p>{video.description}</p>
                        <Link to={`/videos/${video.id}`}>Xem chi tiết</Link>
                    </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default VideoList;