import React, { useRef, useEffect, useState } from "react";

const YouTubeVideoPlayer = ({ videoId, transcription }) => {
  const playerRef = useRef(null);
  const [currentSegment, setCurrentSegment] = useState(0);

  useEffect(() => {
    const player = playerRef.current;

    const syncTranscript = () => {
      if (currentSegment < transcription.segments.length) {
        const segment = transcription.segments[currentSegment];
        if (player.currentTime >= segment.start && player.currentTime < segment.end) {
          setCurrentSegment(currentSegment);
        } else if (player.currentTime >= segment.end) {
          setCurrentSegment((prev) => prev + 1);
        }
      }
    };

    player.addEventListener("timeupdate", syncTranscript);

    return () => {
      player.removeEventListener("timeupdate", syncTranscript);
    };
  }, [currentSegment, transcription]);

  return (
    <div>
      <iframe
        ref={playerRef}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <div>
        <h3>Transcript:</h3>
        <ul>
          {transcription.segments.map((segment, index) => (
            <li
              key={index}
              style={{
                fontWeight: currentSegment === index ? "bold" : "normal",
              }}
            >
              {segment.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YouTubeVideoPlayer;
