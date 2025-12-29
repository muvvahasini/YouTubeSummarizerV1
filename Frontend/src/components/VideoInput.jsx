import API from "../api/backend";
import { useState, useEffect } from "react";

export default function VideoForm({ url: propUrl, setUrl: propSetUrl, onProcess, onUrlChange }) {
  const [localUrl, setLocalUrl] = useState("");

  // if parent provides url/setUrl, use them; otherwise use local state
  const url = propUrl !== undefined ? propUrl : localUrl;
  const setUrl = propSetUrl !== undefined ? propSetUrl : setLocalUrl;

  useEffect(() => {
    if (propUrl !== undefined) setLocalUrl(propUrl);
  }, [propUrl]);

  const handleInputChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (onUrlChange) {
      onUrlChange(newUrl);
    }
  };

  const submitVideo = async () => {
    if (onProcess) {
      onProcess(url);
      return;
    }

    await API.post("/session/start", { videoUrl: url });
    alert("Video processing started");
  };

  return (
    <div className="card video-input">
      <h3>Paste YouTube Link</h3>
      <input
        type="text"
        placeholder="YouTube URL"
        value={url}
        onChange={handleInputChange}
      />
      <button onClick={submitVideo}>Process Video</button>
    </div>
  );
}
