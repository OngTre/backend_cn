import React, { useState } from 'react';
import axios from 'axios';

const AddVideo = () => {
    const [videoId, setVideoId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Kiểm tra dữ liệu trước khi gửi
        console.log('Sending video data:', { videoId, title, description });

        try {
            const response = await axios.post('http://localhost:8080/addVideo', {
                videoId,
                title,
                description,
            });

            if (response.status === 200) {
                alert('Video added successfully');
                // Reset form fields
                setVideoId('');
                setTitle('');
                setDescription('');
            }
        } catch (err) {
            setError('Failed to add video');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Add Video</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="videoId">Video ID:</label>
                <input
                    type="text"
                    id="videoId"
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    required
                    placeholder="Enter YouTube Video ID"
                />

                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>

                <button type="submit">Add Video</button>
            </form>
        </div>
    );
};

export default AddVideo;