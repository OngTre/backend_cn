import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YouTubeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('Meshuggah');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchYouTubeData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/google-youtube-api', {
                params: {
                    search: searchTerm,
                    items: 25,
                },
            });
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchYouTubeData();
    }, [searchTerm]);

    return (
        <div>
            <h1>YouTube Search Results</h1>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search for a video..." 
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {items.map((item) => (
                        <div key={item.url} style={{ marginBottom: '20px' }}>
                            <h3>{item.title}</h3>
                            <iframe 
                                width="560" 
                                height="315" 
                                src={`https://www.youtube.com/embed/${item.url.split('v=')[1]}`} 
                                title={item.title} 
                                frameBorder="0" 
                                allowFullScreen 
                            ></iframe>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YouTubeSearch;